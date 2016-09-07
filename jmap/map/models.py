from django.db import models

# Create your models here.
class GeoObject(models.Model):
    name = models.CharField(max_length=50, verbose_name='Наименование')
    BUILDING = 'BU'
    REPAIR = 'RE'
    EXPLOITATION = 'EX'
    STATUSES = (
        (BUILDING, 'Строительство'),
        (REPAIR, 'Ремонт'),
        (EXPLOITATION, 'Эксплуатация'),
    )
    status = models.CharField(max_length=2, choices=STATUSES, default=EXPLOITATION, verbose_name='Статус')
    def get_status(self):
        if self.status == self.BUILDING:
            return 'Строительство'
        elif self.status == self.REPAIR:
            return 'Ремонт'
        elif self.status == self.EXPLOITATION:
            return 'Эксплуатация'
        else:
            return 'ERROR status code: ' + self.status

    power = models.IntegerField(verbose_name='Мощность')
    longitude = models.FloatField(verbose_name='Долгота')
    latitude = models.FloatField(verbose_name='Широта')

    def __str__(self):
        return self.name + str((self.longitude, self.latitude))