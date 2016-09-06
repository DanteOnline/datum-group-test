from django.contrib import admin
from map.models import GeoObject

# Register your models here.
class GeoObjectAdmin(admin.ModelAdmin):
    list_display = ['name','status','power', 'longitude', 'latitude']

admin.site.register(GeoObject, GeoObjectAdmin)