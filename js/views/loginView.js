// tv/js/views/appView.js
define( ["parse","underscore","backbone","text!templates/guide.html","text!templates/login.html",'router/timeRoute',"views/timeSlot","views/ShowListView","views/favTimeSlot","views/detailListView"], function (Parse, _,Backbone,guideTemplate,loginTemplate,timeRoute,TimeListView,ShowListView,favTimeListView,DetailListView ) {
var loginView = Parse.View.extend({
    events: {
      "submit form.login-form": "logIn",
      "submit form.signup-form": "signUp",
	  "click #register":"showSignUp",
	  "click #login":"showLogin"
    },

    el: ".content",
	template1:_.template(loginTemplate),
    
    initialize: function() {
      _.bindAll(this, "logIn", "signUp","showSignUp","showLogin");
      this.render();
    },
	showSignUp: function(){
		$(".login-form").fadeOut();
		$(".signup-form").fadeIn();
	
	},
	showLogin: function(){
		$(".signup-form").fadeOut();
		$(".login-form").fadeIn();
	
	},
    logIn: function(e) {
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();
      
      Parse.User.logIn(username, password, {
        success: function(user) {
          //var timeRouter = new timeRoute();
		  //Parse.history.start();
			new TimeListView();
			//new formView();
			new DetailListView();
			new favTimeListView();
			new ShowListView();
			//new SearchListView();
		  location.reload();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".login-form .error").html("Invalid username/password").show();
          this.$(".login-form button").removeAttr("disabled");
        }
      });

      //this.$(".login-form button").attr("disabled", "disabled");

      return false;
    },

    signUp: function(e) {
      var self = this;
      var username = this.$("#signup-username").val();
      var password = this.$("#signup-password").val();
      var email = this.$("#signup-email").val();
      var firstname = this.$("#signup-firstname").val();
      var lastname = this.$("#signup-lastname").val();
	  
      
      Parse.User.signUp(username, password, { ACL: new Parse.ACL(),"email":email,"firstname":firstname,"lastname":lastname }, {
        success: function(user) {
			new TimeListView();
			//new formView();
			new DetailListView();
			new favTimeListView();
			new ShowListView();
			//new SearchListView();
		  location.reload();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".signup-form .error").html(error.message).show();
          this.$(".signup-form button").removeAttr("disabled");
        }
      });

      this.$(".signup-form button").attr("disabled", "disabled");

      return false;
    },

    render: function() {
      this.$el.html(this.template1).hide().fadeIn('slow');
      this.delegateEvents();
    }
  });
 return loginView;
});