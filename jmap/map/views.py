from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.base import TemplateView
from map.models import GeoObject
import json
# Create your views here.

class MapView(TemplateView):
    template_name = "index.html"

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
    properties['name'] = object.name
    properties['status'] = object.status
    properties['power'] = object.power
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

