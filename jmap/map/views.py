from django.http import HttpResponse
from django.http import QueryDict
from django.views.generic.edit import DeleteView, UpdateView, CreateView
from django.views.generic.base import TemplateView
from django.core.urlresolvers import reverse_lazy
from map.models import GeoObject
import json

class MapView(TemplateView):
    template_name = "index.html"

class GeoObjectDelete(DeleteView):
    model = GeoObject
    success_url = reverse_lazy('main')

class GeoObjectCreate(CreateView):
    model = GeoObject
    fields = '__all__'
    success_url = reverse_lazy('main')

class GeoObjectsUpdate(UpdateView):
    model = GeoObject
    fields = '__all__'
    success_url = reverse_lazy('main')

def get_object_data(object):
    feature = {}
    geometry = {}
    geometry['type'] = 'Point'
    coordinates = [object.longitude, object.latitude]
    geometry['coordinates'] = coordinates
    geometry['coordinates']
    feature['geometry'] = geometry
    feature['type'] = 'Feature'
    feature['id'] = object.pk
    properties = {}
    properties['Номер'] = object.pk
    properties['Название'] = object.name
    properties['Статус'] = object.get_status()
    properties['Мощьность'] = object.power
    feature['properties'] = properties
    return feature

def get_objects(request):
    #создаем словарь результата
    result = {}
    result['type'] = 'FeatureCollection'
    # получаем все объекты
    objects = GeoObject.objects.all()
    features = []
    for object in objects:
        feature = get_object_data(object)
        features.append(feature)
    result['features'] = features
    jresult = json.dumps(result)
    if request.method == "GET":
        return HttpResponse(jresult, content_type='text/html')
    else:
        return HttpResponse('no', content_type='text/html')


