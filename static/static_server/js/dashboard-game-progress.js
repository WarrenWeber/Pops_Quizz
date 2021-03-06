/*******Fonction pour vérifier que le token peut être envoyé dans l'entete*********/
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


ajaxRefuseInvitation = function(that)
{
  var url_back =  './refuse_game_invitation';
  var game_id = $(that).val();

  /*Entrer le token csrf dans le header si la route est sécurisé*/
  var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
  $.ajaxSetup({
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !that.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      }
  });
  $.ajax({
  	type: 'POST',
    url: url_back,
    data: {'game_id':game_id},
    dataType: 'json',
    success: function (data) {
  	  if(data.is_valid) {
      }
    }
  });
}

$('.refuse_invite').click(function(){
    ajaxRefuseInvitation(this);
    document.getElementById("row-game-refused-"+$(this).val()).classList.remove("hidden");
    document.getElementById("row-join-game-"+$(this).val()).classList.add("hidden");
    document.getElementById("row-decline-game-"+$(this).val()).classList.add("hidden");
});

