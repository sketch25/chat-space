$(function() {

  let search_list = $("#UserSearchResult");
  let member_list = $(".ChatMembers");

  function addUser(user) {
    let html =
      `
        <div class="ChatMember clearfix">
          <p class="ChatMember__name">${user.name}</p>
          <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
        </div>
      `;
    search_list.append(html);
  }

  function addNoUser(msg) {
    let html =
      `
      <div class="ChatMember clearfix">
        <p class="ChatMember__name">${ msg }</p>
      </div>
      `;
    search_list.append(html);
  }

  function addMember(name, id) {
    let html = 
    `
    <div class="ChatMember">
      <p class="ChatMember__name">${name}</p>
      <input name="group[user_ids][]" type="hidden" value="${id}" />
      <div class="ChatMember__remove ChatMember__button">削除</div>
    </div>
    `;
    member_list.append(html);
  }


  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      search_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser(`ユーザーが見つかりません`);
      }
    })
    .fail(function(){
      alert("通信エラーです。ユーザーが表示できません。");
    })
  });
  search_list.on('click', '.ChatMember__add', function(){
    const userName = $(this).attr('data-user-name');
    const userId = $(this).attr('data-user-id');
    $(this).parent().remove();
    addMember(userName, userId);
  });

  member_list.on('click', '.ChatMember__remove', function(){
    $(this).parent().remove();
  });
});



