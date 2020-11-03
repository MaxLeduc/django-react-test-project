import graphene
from graphene_django import DjangoObjectType

from .models import Category, Todo


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "name", "todos")


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ("id", "title", "description", "completed", "category")


class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)
    category_by_name = graphene.Field(
        CategoryType, name=graphene.String(required=True))

    def resolve_all_todos(self, info):
        # We can easily optimize query count in the resolve method
        return Todo.objects.select_related("category").all()

    def resolve_category_by_name(self, info, name):
        try:
            return Category.objects.get(name=name)
        except Category.DoesNotExist:
            return None


class TodoInput (graphene.InputObjectType):
    id = graphene.Int()
    title = graphene.String()
    description = graphene.String()
    completed = graphene.Boolean()


class CreateTodo (graphene.Mutation):
    ok = graphene.Boolean()
    todo = graphene.Field(TodoType)

    class Arguments:
        input = TodoInput(required=True)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        todo_instance = Todo(
            title=input.title,
            description=input.description,
            completed=input.completed
        )
        todo_instance.save()
        return CreateTodo(ok, todo=todo_instance)


class UpdateTodo (graphene.Mutation):
    ok = graphene.Boolean()
    todo = graphene.Field(TodoType)

    class Arguments:
        input = TodoInput(required=True)

    @staticmethod
    def mutate(root, info, input=None):
        ok = False
        todo_instance = Todo.objects.get(id=input.id)

        if todo_instance:
            ok = True
            todo_instance.title = input.title
            todo_instance.description = input.description
            todo_instance.completed = input.completed
            todo_instance.save()

        return UpdateTodo(ok=ok, todo=todo_instance)


class DeleteTodo (graphene.Mutation):
    ok = graphene.Boolean()
    todo = graphene.Field(TodoType)
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @staticmethod
    def mutate(root, info, id=None):
        ok = False
        todo_instance = Todo.objects.get(id=id)

        if (todo_instance):
            ok = True
            todo_instance.delete()

        return DeleteTodo(ok=ok, id=id)


class Mutation(graphene.ObjectType):
    create_todo = CreateTodo.Field()
    update_todo = UpdateTodo.Field()
    delete_todo = DeleteTodo.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
