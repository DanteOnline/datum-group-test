from django.test import TestCase
from map.models import GeoObject

# Create your tests here.
class GeoObjectTestCase(TestCase):
    def setUp(self):
        GeoObject.objects.create(name='O1',status = GeoObject.BUILDING, power = 10, longitude=1.0, latitude=2.0)
        GeoObject.objects.create(name='O2', status=GeoObject.REPAIR, power=5, longitude=3.0, latitude=2.5)
        GeoObject.objects.create(name='O3', status=GeoObject.EXPLOITATION, power=5, longitude=3.0, latitude=2.5)

    def test_str(self):
        o1 = GeoObject.objects.get(name='O1')
        o2 = GeoObject.objects.get(name='O2')
        self.assertEqual(str(o1),'O1 (1.0, 2.0)')
        self.assertEqual(str(o2), 'O2 (3.0, 2.5)')

    def test_get_status(self):
        o1 = GeoObject.objects.get(name='O1')
        o2 = GeoObject.objects.get(name='O2')
        o3 = GeoObject.objects.get(name='O3')
        self.assertEqual(o1.get_status(), 'Строительство')
        self.assertEqual(o2.get_status(), 'Ремонт')
        self.assertEqual(o3.get_status(), 'Эксплуатация')
