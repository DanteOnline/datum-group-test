from django.conf.urls import url
from map.views import MapView, get_objects, delete_post, GeoObjectDelete, GeoObjectCreate, GeoObjectsUpdate

urlpatterns = [
    url(r'^$', MapView.as_view(), name='main'),
    url(r'go/$', get_objects, name='get_objects'),
    #url(r'delete_post/$', delete_post, name='delete_post'),
    url(r'(?P<pk>\d+)/delete/$', GeoObjectDelete.as_view(), name='delete'),
    url(r'(?P<pk>\d+)/update/$', GeoObjectsUpdate.as_view(), name='update'),
    url(r'create/$', GeoObjectCreate.as_view(), name='create')
]