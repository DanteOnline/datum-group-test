from django.conf.urls import url
from map.views import MapView, get_objects, delete_post

urlpatterns = [
    url(r'^$', MapView.as_view(), name='main'),
    url(r'go/$', get_objects, name='get_objects'),
    url(r'delete_post/$', delete_post, name='delete_post'),
]