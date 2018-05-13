from django.db import models


# Create your models here.

class Section(models.Model):
    name = models.CharField(max_length=50, blank=False, default="default-section")
    description = models.CharField(max_length=200, blank=True, default="")
    father_section = models.ManyToManyField('self', symmetrical=False, related_name='root')
    admin = models.ManyToManyField('User',symmetrical=False,related_name='admin')
    create_time = models.DateTimeField(auto_now_add=True)
    #valid = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class College(models.Model):
    code = models.CharField(max_length=50, blank=False, default="default-college-code")
    name = models.CharField(max_length=50, blank=False, default="default-college-name")
    section = models.ForeignKey('Section',on_delete=models.CASCADE)
    
    def __str__(self):
        return 'College Code: %s College Name: %s'%(self.code,self.name)
        
class Course(models.Model):
    
    code = models.CharField(max_length=50, blank=False, default="default-course-code")
    name = models.CharField(max_length=50, blank=False, default="default-course-name")
    section = models.ForeignKey('Section',on_delete=models.CASCADE)
    college = models.ForeignKey('College',on_delete=models.CASCADE)
    
    def __str__(self):
        return 'Course Code: %s Course Name: %s'%(self.code,self.name)

class Teacher(models.Model):
    name = models.CharField(max_length=50, blank=False, default="default-course-name")
    section = models.ForeignKey('Section',on_delete=models.CASCADE)
    college = models.ForeignKey('College',on_delete=models.CASCADE)
    course  = models.ForeignKey('Course',on_delete=models.CASCADE)
    
    def __str__(self):
        return 'Teacher : %s'%(self.name)

        
        
class Reply(models.Model):
    uid = models.ForeignKey("User", on_delete=models.CASCADE, related_name='reply')
    content = models.TextField()
    post_id = models.ForeignKey("Thread", on_delete=models.CASCADE, related_name='reply')
    reply_to = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='reply')
    create_time = models.DateTimeField(auto_now_add=True)
    #valid = models.BooleanField(default=True)

    def __str__(self):
        return self.content


class Notice(models.Model):
    uid = models.ForeignKey("User", on_delete=models.CASCADE, related_name='notice')
    title = models.CharField(max_length=50, blank=True, default="")
    content = models.TextField()
    section_id = models.ForeignKey("Section", on_delete=models.CASCADE, related_name='notice')
    valid = models.BooleanField(default=True)
    create_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class User(models.Model):
    uid = models.CharField(max_length=20,primary_key=True)
    name = models.CharField(max_length=50)
    signature = models.TextField()
    avatar = models.ImageField()
    
    def __str__(self):
        return '%s %s'%(self.uid,self.name)

        
class Thread(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    poster = models.ForeignKey('User',on_delete=models.CASCADE) 
    section = models.ForeignKey('Section',on_delete=models.CASCADE)
    date = models.DateField()
    
    CLOSED = 'CL'
    OPEN = 'OP'
    THREAD_STATUS_CHOICES = (
        (CLOSED,'closed'),
        (OPEN,'open'),
    )
    
    status = models.CharField(
        max_length=2,
        choices=THREAD_STATUS_CHOICES,
        default=OPEN,
    )
    
    def __str__(self):
        return self.title
 

class Attachment(models.Model):
    name = models.CharField(max_length=50)
    thread = models.ForeignKey('Thread',on_delete=models.CASCADE)
    file = models.FileField()
    date = models.DateField()
    
    def __str__(self):
        return self.name

    
class Message(models.Model):
    sender_id = models.ForeignKey('User',on_delete=models.CASCADE,related_name='sender')
    receiver_id = models.ForeignKey('User',on_delete=models.CASCADE,related_name='receiver')
    content = models.TextField()
    date = models.DateField()
    
    def __str__(self):
        return 'From %s to %s'%(self.sender_id,self.receiver_id)

        
class Subscribe(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE,related_name='user')
    section = models.ForeignKey('Section',on_delete=models.CASCADE,related_name='section')
    date = models.DateField()
    
    def __str__(self):
        return '%s subscribed %s'(self.uid,self.section_id)
    
