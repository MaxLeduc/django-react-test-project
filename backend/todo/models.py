from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    category = models.ForeignKey(
        Category, related_name="todos", on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.title
