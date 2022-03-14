from django.contrib import admin
from .models import Genre, Movie, Cast, OnelineReview, Rating

# Register your models here.
admin.site.register(Genre)
admin.site.register(Movie)
admin.site.register(Cast)
admin.site.register(OnelineReview)
admin.site.register(Rating)