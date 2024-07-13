from django.db import models


class Dish(models.Model):
    dishId = models.AutoField(primary_key=True)
    dishName = models.CharField(max_length=255)
    imageUrl = models.URLField(max_length=255)
    isPublished = models.BooleanField(default=False)

    def __str__(self):
        return self.dishName