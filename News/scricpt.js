const API_KEY="60d3c97955d04883aeab9a6e3a993faa"
const url="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=> fetchNews("India"));
function reload(){
  window.location.reload();
}

async function fetchNews(query){
  const res = await  fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
   bindData(data.articles);
}
 function bindData(articles){
     const cardContainer=document.getElementById("cards-container");
     const newsCardTemplate=document.getElementById("news-card");
    cardContainer.innerHTML="";
    
    articles.forEach((article)=>{
         if(!article.urlToImage)return;
         const cardClone=newsCardTemplate.content.cloneNode(true);
          fillDataInCard(cardClone,article);
         cardContainer.appendChild(cardClone);
    });
 }
     function fillDataInCard(cardClone,article){
         const newsImg=cardClone.querySelector('#new-img');
         const newsTitle=cardClone.querySelector('#news-title');
         const newsSource=cardClone.querySelector('#news-source');
         const newsDesc=cardClone.querySelector('#news-desc');

         newsImg.src=article.urlToImage;
         newsTitle.innerHTML=article.title;
         newsDesc.innerHTML=article.description;
         

          const date=new Date(article.publishedAt).toLocaleString("en-Us",{
            timeZone:'Asia/Jakarta'
         });
        newsSource.innerHTML=`${article.source.name}-${date}`;
        cardClone.firstElementChild.addEventListener("click",()=>{
          window.open(article.url,"_blank")

        })
      }
      let curSelectedNav=null;
      function onNavItemClick(id){
        fetchNews(id);
        const navItem=document.getElementById(id);
        curSelectedNav?.classList.remove("active");
        curSelectedNav=navItem;
        curSelectedNav.classList.add("active");
      }
      const SearchButton=document.getElementById("search-button");
      const SearchText=document.getElementById("search-text");

      SearchButton.addEventListener('click',()=>{
        const query=SearchText.value;
        if(!query)return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav=null;

      })


