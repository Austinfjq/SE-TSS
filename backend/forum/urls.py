from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('subscriptions',views.subscriptions.as_view(),name='subscriptions'),
    path('courses',views.courses.as_view(),name='courses'),
    path('course',views.course.as_view(),name='course'),
    path('course_posts',views.course_posts.as_view(),name='course_posts'),
    path('course_newpost',views.course_newpost.as_view(),name='course_newpost'),
    path('teacher',views.teacher.as_view(),name='teacher'),
    path('teacher_posts',views.teacher_posts.as_view(),name='teacher_posts'),
    path('teacher_newpost',views.teacher_newpost.as_view(),name='teacher_newpost'),
    path('post',views.thread.as_view(),name='post'),
    path('post_reply',views.reply.as_view(),name='reply'),
    path('post_newreply',views.post_newreply.as_view(),name='post_newreply'),
    path('comment',views.comment.as_view(),name='comment'),
    path('sectionnames',views.sectionnames.as_view(),name='sectionnames'),
    path('college_list',views.college_list.as_view(),name='college_list'),
    path('course_list',views.course_list.as_view(),name='course_list'),
    path('teacher_list',views.teacher_list.as_view(),name='teacher_list'),
    path('newmsgs',views.newmsgs.as_view(),name='newmsgs'),
    path('msgentries',views.msgentries.as_view(),name='msgentries'),
    path('messages',views.messages.as_view(),name='messages'),
    path('announcements',views.announcements.as_view(),name='announcements'),
    path('info',views.info.as_view(),name='info'),
]