Recipes = new Mongo.Collection("recipes");

Recipes.allow({
  insert:function(userId,doc){
    return !!userId;
  },
  update:function(userId,doc){
    return !!userId;
  }

});

Ingredient = new SimpleSchema({
  name: {
    type: String,
    label:"Nombre"
  },
  amount: {
    type: String,
    label: "Cantidad"
  }
});

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Nombre"
  },
  desc: {
    type: String,
    label: "Descipción"
  },
  ingredients:{
    type:[Ingredient],
    label:"Ingredientes"

  },
  inMenu: {
    type: Boolean,
    label: "En Menu?",
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  author:{
    type: String,
    label: "Autor",
    autoValue: function(){
      return this.userId
    },
    autoform:{
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    label: "Creado",
    autoValue: function(){
      return new Date()
    },
    autoform:{
      type: "hidden"
    }
  }

});

Meteor.methods({
  toggleMenuItem: function(id, currentState){
    Recipes.update(id,{
      $set:{
        inMenu: !currentState
      }
    });
  },
  deleteRecipe: function(id){
    Recipes.remove(id);
  }
});

Recipes.attachSchema( RecipeSchema);
