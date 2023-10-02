//Menu data structure
const menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

//Task 1.0

const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = "<h1>SEI Rocks!</h1>";
mainEl.classList.add('flex-ctr');

//Task 2.0

const topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = '100%'
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');



//Task 3.0
//Copy the following data structure to the top of script.js:
menuLinks.forEach(function(link) {
    const newA = document.createElement("a");
    newA.setAttribute('href', link.href);
    newA.textContent = link.text
    topMenuEl.appendChild(newA);
})

//Task 4.0
//Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl  = document.getElementById('sub-menu');
subMenuEl.style.height = '100%'
subMenuEl.style.backgroundColor = 'var( --sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = ('absolute');
subMenuEl.style.top = '0';

//Task 5.0
const topMenuLinks = topMenuEl.querySelectorAll('a');
let showingSubMenu = false;
topMenuEl.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.tagName !== "A") {
    return;
  } 
  if (event.target.classList.contains('active')) {
    event.target.classList.remove('active');
    showingSubMenu = false;
    subMenuEl.style.top = '0';
    return;
  }
  if (event.target.textContent.toLowerCase() === 'about') {
    const newH1  = document.createElement('h1');
    newH1.innerHTML = 'about';
    mainEl.innerHTML = '';
    mainEl.appendChild(newH1);
  }
      
  topMenuLinks.forEach(function(link) {
    if (link !== event.target && link.classList.contains('active')) {
      link.classList.remove('active');
    }
  });
  
  event.target.classList.add('active');
  const linkObject = menuLinks.find(link => link.text === event.target.textContent);

  if (linkObject && linkObject.subLinks) {
    showingSubMenu = true;
    buildSubMenu(linkObject.subLinks)
    subMenuEl.style.top = '100%';

  } else { 
    showingSubMenu = false;
    subMenuEl.style.top = '0';

  }
  console.log(event.target.textContent);

});

function buildSubMenu(subLinks) {
  subMenuEl.innerHTML = '';
  subLinks.forEach(function(subLink) {
    if (subLink && subLink.text) {
      const newSubLink = document.createElement("a");
      newSubLink.setAttribute('href', subLink.href);
      newSubLink.textContent = subLink.text;
      subMenuEl.appendChild(newSubLink);
    }
  })
  
  subMenuEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.tagName !== "A") {
      return;
      
    }
    console.log(event.target.textContent);
    showingSubMenu = false;
    subMenuEl.style.top = '0';
    
    topMenuLinks.forEach(function(link) {
      if (link.classList.contains('active')) {
        link.classList.remove('active');
      }
    });
    const clickedText = event.target.textContent;
    const newH1 = document.createElement('h1');
    newH1.innerHTML = clickedText;
    mainEl.innerHTML = '';
    mainEl.appendChild(newH1);
  });
}
