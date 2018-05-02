from django.db import models
from django.db import transaction
import django.utils.timezone as timezone
from rest_framework.exceptions import APIException, ParseError, NotFound

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager

GENDER_CHOICES = (
    ('M', '男'),
    ('F', '女'),
)


class Department(models.Model):
    name = models.CharField("所在院系", primary_key=True, max_length=100)


class AccountManager(BaseUserManager):

    @transaction.atomic
    def create_user(self, username, id_number=None, password=None, user_type=None, **kwargs):
        # if the user is not admin, don't need password
        if not id_number or len(id_number) != 18:
            raise ParseError(detail='id_number format invalid')
        password = password
        if len(id_number) < 6:
            raise ParseError(detail='username format invalid')
        else:
            password = id_number[-6:]

        if not user_type:
            raise ParseError(detail='user type invalid')

        if (Account.objects.filter(username=username).count() > 0):
            raise ParseError(detail='username already exists')

        department = None
        try:
            department = Department.objects.get(name=kwargs.get('department', '信息中心'))
        except Exception as err:
            raise ParseError(detail='department not exists')

        account = self.model(
            username=username,
            id_number=id_number,
            password=password,
            user_type=user_type,
        )

        # password encrypt
        account.set_password(password)
        account.save()

        if user_type == 1:
            Student.objects.create(
                username=account,
                id_number=id_number,
                email=kwargs.get('email', None),
                gender=kwargs.get('gender', '男'),
                name=kwargs.get('name', '系统管理员'),
                department=department,
                grade=kwargs.get('grade'),
                major=kwargs.get('major'),
                class_name=kwargs.get('class_name'),
                img=kwargs.get('img', None)
            )
        elif user_type == 2:
            Faculty.objects.create(
                username=account,
                id_number=id_number,
                email=kwargs.get('email', None),
                gender=kwargs.get('gender', '男'),
                name=kwargs.get('name', '系统管理员'),
                department=department,
                title=kwargs.get('title'),
                img=kwargs.get('img', None)
            )
        elif user_type == 3:
            Staff.objects.create(
                username=account,
                id_number=id_number,
                email=kwargs.get('email', None),
                gender=kwargs.get('gender', '男'),
                name=kwargs.get('name', '系统管理员'),
                department=department,
            )
        elif user_type == 4:
            Admin.objects.create(
                username=account,
                id_number=id_number,
                email=kwargs.get('email', None),
                gender=kwargs.get('gender', '男'),
                name=kwargs.get('name', '系统管理员'),
            )
        else:
            raise ParseError(detail='user type not exists')
        return account

    def create_superuser(self, username, id_number=None, password=None, **kwargs):
        account = self.create_user(username, id_number, password, 4, **kwargs)
        account.is_admin = True
        account.is_staff = True
        account.is_superuser = True
        account.save()
        return account


class Account(AbstractBaseUser):
    username = models.CharField("用户名", unique=True, max_length=20, primary_key=True)
    id_number = models.CharField("身份证号", unique=True, max_length=18, default='null')
    USER_TYPE_CHOICES = (
        (1, '学生'),
        (2, '老师'),
        (3, '教务管理员'),
        (4, '系统管理员'),
    )
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=1)
    objects = AccountManager()

    # default search field
    USERNAME_FIELD = 'username'

    # 默认需求字段，密码自动需要
    REQUIRED_FIELDS = ['id_number']

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class People(models.Model):
    username = models.OneToOneField(Account, on_delete=models.CASCADE, primary_key=True)
    id_number = models.CharField("身份证号", unique=True, max_length=18, default='null')
    date_created = models.TimeField('保存日期', auto_now_add=True)
    date_modified = models.TimeField(auto_now=True)
    email = models.EmailField("电子邮件", blank=True, null=True)
    name = models.CharField("姓名", max_length=20, null=True)
    gender = models.CharField("性别", choices=GENDER_CHOICES, max_length=1, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)


class Student(People):
    img = models.ImageField("个人头像", max_length=1024 * 1024, upload_to="profile", blank=True, null=True)
    grade = models.IntegerField("入学年份", null=False, default=2015)
    major = models.CharField("专业", max_length=100, null=False)
    class_name = models.CharField("所在班级", max_length=100, null=False)


# Professor
class Faculty(People):
    title = models.CharField("职称", max_length=50, blank=True, null=False)  # eg: lecturer,associate professor ....
    img = models.ImageField("个人头像", max_length=1024 * 1024, upload_to="profile", blank=True, null=True)


# Education Advisor/School Official
class Staff(People):
    img = models.ImageField("个人头像", max_length=1024 * 1024, upload_to="profile", blank=True, null=True)


class Admin(People):
    pass


class Course(models.Model):
    STATE_CHOICES = (
        (0, '不通过'),
        (1, '待审批'),
        (2, '已通过'),
    )
    course_id = models.CharField("课号", max_length=10, primary_key=True, default="null")
    name = models.CharField("名称", max_length=20, unique=True)
    credit = models.FloatField("学分", null=False)
    capacity = models.IntegerField("容量", null=False)
    classroom = models.CharField("教室", max_length=20, null=True)
    assessment = models.CharField("考核方式", max_length=20, null=True)
    state = models.PositiveSmallIntegerField("审核状态", choices=STATE_CHOICES, default=0)
    # faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, null=False)
