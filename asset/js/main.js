const fetch_data = async (username) => {
  let url = await fetch(`https://api.github.com/users/${username}`);
  return url;
};

let card_container = document.querySelector(".all-card-info");

let input_search = document.querySelector("input[type= 'text']");

let btn_search = document.querySelector(".btn_search");

btn_search.addEventListener("click", () => {

  fetch_data(input_search.value)
    .then((res) => res.json())
    .then((data) => {
      let {
        name,
        avatar_url,
        company,
        bio,
        public_repos,
        location,
        followers,
        created_at,
        user_view_type,
      } = data;

      let split_date = created_at.split("-");
      let end_date = split_date[2].slice(0, 2);
      let date = [split_date[0], split_date[1], end_date].join("-");
      let time = split_date[2].slice(3, 8);

      let content = `  <div class="card">
            <div class="globale-info">
                <img src= ${avatar_url} alt="avatar">
                <h2 class="name">${name || data.login} </h2>
                <h4 class="bio"><span id="bio">Bio :</span> 
                ${bio == null ? "empty" : bio}   
                </h4>
            </div>
            <h3 class="followers"><span id="Followers">Followers :</span> ${followers} </h3>
            <h3 class="company"><span id="Company">Company :</span> ${company} </h3>
            <h3 class="create-at"><span id="Create">Create At :</span> ${date} ${time} </h3>
            <h3 class="location"><span id="Location">Location :</span> ${location} </h3>
            <h3 class="public-repos"><span id="Public_Repos">Public Repos :</span> ${public_repos} </h3>
            <h3 class="user-view-type"><span id="User_View_Type">User View Type : </span> ${user_view_type} </h3>
        </div>`;

      card_container.innerHTML = content;
    });
});
