const year = document.getElementById("date");
year.innerHTML = new Date().getFullYear(); //автоматическое обновление года на сайте

//*********** закрытие ссылок ********
const navToggle = document.querySelector(".nav-toggle");//кнопка меню общая
const linksContainer = document.querySelector(".links-container");//переменная со всеми ссылками из меню,имеет выоту 0 по случаю ошибки и по умолчнию
const links = document.querySelector(".links");//перемнная содержащая каждую ссылку списка

navToggle.addEventListener("click", function(){
   //linksContainer.classList.toggle("show-links");
   const linksHeight = links.getBoundingClientRect().height;
   const containerHeight = linksContainer.getBoundingClientRect().height;//vозвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
   

   if(containerHeight === 0){ //если настройка по умолчанию правильная, тогда я динамически добавлю высоту для своего контейнера, если 0 - это значит ссылки скрыты
      linksContainer.style.height = `${linksHeight}px`//добавляем высоту для "ребенка" - linksHeight
   }
   else{
      linksContainer.style.height = 0;// если ссылки меню уже открыты , то мы хотим их скрыть с помощью приравнивания к 0
   }
});

//**********fixed navbar ************
const navbar = document.getElementById("nav");//завели шапку в переменную
const topLink = document.querySelector(".top-link"); //переменная для стрелочки прокрутки наверх
//*******  фиксированный navbar, сверху белая полоса *********
window.addEventListener("scroll", function (){ //callback функция опять
   const scrollHeight = window.pageYOffset; //возвращает количество пикселей на которое прокручен документ по вертикали, если колво пикселей больше чем шапка сверху
   const navHeight = navbar.getBoundingClientRect().height;
  if(scrollHeight > navHeight){
     navbar.classList.add("fixed-nav");
  }
  else{
     navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500){ //мы можем перемещаться по странице из-за добавления в цсс Default HTML Settup
     topLink.classList.add("show-link");//smooth перемещение происходит изза цсс html{scroll-behaviour:smooth}
   }
  else {
     topLink.classList.remove("show-link");
  }
});
//****************smooth scroll ***********
//select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {//callback-function//пересмотреть если не работает в исходнике
   link.addEventListener("click", (e) => {
      //prevent default
      e.preventDefault();
      //navigate to specific spot
      const id = e.currentTarget.getAttribute("href").slice(1); //керрентТаргет-ссылка на которую мы только что кликнули, и берем атрибут(айди #tours/#about и тд) ссылки на которую кликнули, slice- вырезаем из строки значение, без изменения всей строки, 1- потому что мы пропускаем хэштег # и берем конкретно наименование айди, потому что для document.getElementById("nav") нужно просто слово наименование айди 
      const element = document.getElementById(id);//мы схватили элемент по айди который вырезали на предыдущей строке
      //calculate the heights
      const navHeight = navbar.getBoundingClientRect().height;
      const containerHeight = linksContainer.getBoundingClientRect().height;
      const fixedNav = navbar.classList.contains("fixed-nav"); //если навбар имеет фиксированный класс то тру-1, аесли нет фолсе-0
      let position = element.offsetTop - navHeight; //offsetTop-число, показывающее верхнюю позицию элемента в пикселях(чтобы скролл опускался не ниже этого топа). Мы отнимаем от высоты псекции размер белой полоски сверху,чтобы прийти точно по линии на секцию
      
      if(!fixedNav){ //если fixedNav=false, то есть navbar в статической позиции и не зафиксирована
         position = position - navHeight;
      }
      
      if (navHeight > 82){ //такая высота становится когда мы уже тыкали на ссылочку любую значит прибавилась еще высота линксКонтейнер 
         position = position + containerHeight;
      }

      window.scrollTo({
         left: 0, //потому что нам надо скроллить только вертикально
         top: position,
      });//внутри координаты в которые хотим прокрутить
   linksContainer.style.height = 0; //чтобы при нажатии на ссылку для прокрутки верхняя полоска сворачивалась
   });
});

// День недели и время для блока с расписанием 
const date = new Date();
const hours = date.getHours();
let minutes = date.getMinutes();
if (minutes < 10){
   minutes = `0${minutes}`;
}
let day = date.getDay();
switch (day) {
   case 0:
      day = "Воскресенье";
      break;
   case 1:
      day = "Понедельник";
      break;
   case 2:
      day = "Вторник";
      break;
   case 3:
      day = "Среда";
      break;
   case 4:
      day = "Четверг";
      break;   
   case 5:
      day = "Пятница";
      break;
   case 6:
      day = "Суббота";
      break;

   default:
      day - 'Не грузит'
      break;
};
document.querySelector('.time-right-now').innerHTML = `${day}, ${hours}:${minutes}`; // Вывод строки с днем недели и врменем 

document.querySelectorAll('.btn-group').forEach(item =>{ // ВЫБОР ГРУППЫ
   item.addEventListener('click', (e)=>{
      e.preventDefault();
      document.querySelectorAll('.btn-week').forEach(item=>{ // сброс кнопки выбора недели
         item.classList.remove("btn-week--active"); // БЭМ нейминг
         console.log(item)
      });
      document.querySelector('.attention').classList.add('none');
      let groupTable;
      document.querySelectorAll('.timetable').forEach(group =>{
         if(group.getAttribute('data-id') === e.target.getAttribute('data-id')){
            group.classList.remove('none');
            groupTable = group;
         } else{
            group.classList.add('none');
         }
      });
      document.querySelector('.btn-week-wrapper').classList.remove('none');
     // ВЫБОР НЕДЕЛИ
      document.querySelector('.btn-chet').addEventListener('click', (e)=>{ // кнопка Четной недели
         e.target.classList.add('btn-week--active'); 
         document.querySelector('.btn-nechet').classList.remove('btn-week--active');
         groupTable.querySelector('.week.chet').classList.remove('none');
         groupTable.querySelector('.week.nechet').classList.add('none');
         displayCurrentLes();
      });
   
      document.querySelector('.btn-nechet').addEventListener('click', (e)=>{ // кнопка нечетной недели
         e.target.classList.add('btn-week--active');
         document.querySelector('.btn-chet').classList.remove('btn-week--active'); 
         groupTable.querySelector('.week.chet').classList.add('none');
         groupTable.querySelector('.week.nechet').classList.remove('none');
         displayCurrentLes();
      });
   });
   
});


document.querySelector('#popup-open-btn').addEventListener('click', (e)=>{ // показ модального окна с преподавателями
   e.preventDefault();
   document.querySelector('#tours').classList.add('none');
   document.querySelector('#nav').classList.add('none');
   document.querySelector('.popup-card-wrapper').classList.remove('none');
   document.querySelector('body').classList.add('no-scroll');
   document.querySelector(".top-link").classList.add('none'); 
   document.querySelector('.popup-card-wrapper').querySelectorAll('.btn-popup').forEach(btn =>{ // показ кафедр
      btn.addEventListener('click', (e)=>{
         e.preventDefault();
         const kaf = e.target.getAttribute('data-id');
         document.querySelectorAll('.popup-container').forEach(item =>{
            if(item.getAttribute('id') !== kaf){
               item.classList.add('none');
            } else {
               item.classList.remove('none');
            }
         });
      });
   });
   document.querySelector('.popup-close-btn').addEventListener('click', (e)=>{ // скрипт кнопки закрытия модального окна 
      e.preventDefault();
      document.querySelector('#tours').classList.remove('none');
      document.querySelector('#nav').classList.remove('none');
      document.querySelector('.popup-card-wrapper').classList.add('none');
      document.querySelector('body').classList.remove('no-scroll');
      document.querySelector(".top-link").classList.remove('none');
   });
   document.querySelector('.popup-card-wrapper').addEventListener('click', (e)=>{ // закрытие через фон
      if (e.target == document.querySelector('.popup-card-wrapper')){
         document.querySelector('#tours').classList.remove('none');
         document.querySelector('#nav').classList.remove('none');
         document.querySelector('.popup-card-wrapper').classList.add('none');
         document.querySelector('body').classList.remove('no-scroll');
         document.querySelector(".top-link").classList.remove('none');
      }
   });
});


function displayCurrentLes(){ // функция показа текущей пары
   document.querySelectorAll('.day').forEach(item =>{
      if ((item.querySelector('.day-title').textContent === day) && (item.closest(".week").classList.contains("none") === false)){
         item.querySelectorAll('.lesson').forEach(lesson => {
            const now = hours * 60 + parseInt(minutes);  // время сейчас в минутах
            if ((lesson.getAttribute('data-sm') <= now) && (lesson.getAttribute('data-em') >= now)){ 
               lesson.style.backgroundColor = 'rgba(227, 139, 139, 0.703)';
            }; 
         })
      }; 
   })
};



// Вывод дисциплин
document.querySelectorAll('.card').forEach(item=>{ // вывод дисциплин 
   item.addEventListener('click', ()=>{
      document.querySelector('#tours').classList.add('none');
      document.querySelector('#nav').classList.add('none');
      document.querySelector('.popup-info-wrapper').classList.remove('none');
      data.forEach(teacher =>{
         if (item.getAttribute('id') == teacher.id){
            document.querySelector('.popup-info-title').insertAdjacentHTML('afterend', teacher.markup);
         };
      });
      document.querySelector('.popup-info-wrapper').addEventListener('click', (e)=>{ // закрытие
         if (e.target == document.querySelector('.popup-info-wrapper')){
            document.querySelector('#tours').classList.remove('none');
            document.querySelector('#nav').classList.remove('none');
            document.querySelector('.popup-info-subtitle').innerHTML = '';
            document.querySelector('.popup-info-wrapper').classList.add('none');
         };
      });
   });
});

// Вывод информации при наведении
document.querySelectorAll('.card').forEach(item=>{
   item.addEventListener('mouseover', ()=>{
      if (item.querySelector('.hover-card')){
         item.querySelector('.hover-card').classList.remove('none');
         data.forEach(el =>{
            if (item.getAttribute('id') == el.id){
               item.querySelector('.hover-card').insertAdjacentHTML('afterbegin', el.subtitle);
            };
         });
         item.addEventListener('mouseout', ()=>{
            item.querySelector('.hover-card').innerHTML = '';
            item.querySelector('.hover-card').classList.add('none');
         });
      };
   });
});



// Карусель
let radius = 250; 
let autoRotate = true;
let rotateSpeed = -60; 
let imgWidth = 245; 
let imgHeight = 160;
setTimeout(init, 300);
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let carousel = document.getElementById("carousel");
let aImg = ospin.getElementsByTagName("img");
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
let ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";
function init(delayTime) {
    for (let i = 0; i < aImg.length; i++) {
        aImg[i].style.transform =
        "rotateY(" +
        i * (360 / aImg.length) +
        "deg) translateZ(" +
        radius +
        "px)";
        aImg[i].style.transition = "transform 1s";
        aImg[i].style.transitionDelay =
        delayTime || (aImg.length - i) / 4 + "s";
    }
}
function applyTranform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}
function playSpin(yes) {
    ospin.style.animationPlayState = yes ? "running" : "paused";
}
let sX,
sY,
nX,
nY,
desX = 0,
desY = 0,
tX = 0,
tY = 10;
if (autoRotate) {
    let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
    )}s infinite linear`;
}
carousel.onpointerdown = function(e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    let sX = e.clientX,
    sY = e.clientY;
    this.onpointermove = function(e) {
        e = e || window.event;
        let nX = e.clientX,
        nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };
    this.onpointerup = function(e) {
        odrag.timer = setInterval(function() {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };
    return false;
};

document.querySelectorAll('.carusel-img').forEach(item =>{ // увеличение картинки карусели
   item.addEventListener('click', (e)=>{
      const path = e.target.getAttribute('src');
      document.querySelector('#nav').classList.add('none');
      document.querySelector('.gallery').classList.remove('none');
      document.querySelector('.img-gallery').setAttribute('src', path);
      document.querySelector('.gallery-close-btn').addEventListener('click', (e)=>{ // закрытие
         e.preventDefault();
         document.querySelector('.gallery').classList.add('none');
         document.querySelector('#nav').classList.remove('none');
      });
      document.querySelector('.gallery').addEventListener('click', (e)=>{
         if(e.target == document.querySelector('.gallery')){
            document.querySelector('#nav').classList.remove('none');
            document.querySelector('.gallery').classList.add('none');
         }
      });
   });
});



// Информация о преподавателях 
const data = [
   {
      id: 'pisareva',
      markup: `
         <p class="popup-info-subtitle">
            Бизнес-прогнозирование <br>
            Методы социально-экономического прогнозирования <br>
            Эконометрика Эконометрическое моделирование <br>
            Методы анализа нечисловой информации <br>
            Теория игр и исследование операций <br>
            Математические методы в экономике <br>
            Стратегическое планирование и прогнозирование <br>
            Бизнес-планирование <br>
            Бизнес-аналитика <br> 
            Методология разработки и принятия управленческих решений <br>
            Методы принятия управленческих решений <br>
            Методология научных исследований <br>
            Экспертные технологии в управлении экономикой <br>
            Риск-менеджмент стартап-проектов и др 
         </p>
      `
   },
   {
      id: 'kasatkina',
      markup: `
         <p class="popup-info-subtitle">
            Документационное обеспечение управления в цифровой среде <br>
            Документационное обеспечение управления
         </p>
      `
   },
   {
      id: 'belousova',
      markup: `
         <p class="popup-info-subtitle">
            Операционные системы <br>
            Технические средства информационных систем <br>
            Системное и прикладное программное обеспечение <br>
            Интернет-технологии <br>
            Информационные технологии в управлении <br>
            Интеллектуальные информационно-аналитические системы
         </p> 
      `
   },
   {
      id: 'rytikov',
      markup: `
         <p class="popup-info-subtitle">
            Численные методы в компьютерных вычислениях <br>
            Математические методы и информационные технологии <br>
            Основы моделирования и оптимизации материалов и технологических процессов <br>
            Информационная структура малых и средних предприятий <br>
            Теоретические основы информационных процессов и систем <br>
            Моделирование бизнес-процессов <br>
            Управление IT-проектами <br>
            Управление IT-сервисами и контентом <br>
            Технологии обработки деловой информации с помощью табличных процессоров
         </p> 
      `
   },
   {
      id: 'perfilev',
      markup: `
         <p class="popup-info-subtitle">
            Математика <br>
            Математический анализ <br>
            Прикладная математика
         </p> 
      `
   },
   {
      id: 'terehova',
      markup: `
         <p class="popup-info-subtitle">
            Корпоративные информационные системы на базе решений SAP  <br>
            Управление активами предприятия на базе EAM-системы IBM Maximo  <br>
            Анализ и моделирование бизнес-процессов  <br>
            Управление разработкой информационных систем  <br>
            Информационная система и организация  <br> 
            Управление информационными системами <br>
            Системная интеграция и управление приложениями информационных систем
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'badina',
      markup: `
         <p class="popup-info-subtitle">
            Информационные технологии в юридической деятельности <br>
            Информационные технологии поддержки личной работы <br>
            Документационное обеспечение управления <br>
            Архивное право <br>
            Защита информации и информационная безопасность <br>
            Мировые информационные ресурсы <br>
            Системы электронного документооборота <br>
            Правовая защита интеллектуальной собственности
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'blinnikova',
      markup: `
         <p class="popup-info-subtitle">
            Управление бизнес и ИТ-проектами <br>
            Управление ИТ-проектами <br>
            Системы поддержки принятия решениями <br>
            ИТ в управлении знаниями <br>
            Консалтинг и аудит в области ИС <br>
            Маркетинг технологических инноваций <br>
            Информационный менеджмент и маркетинг <br>
            Информационные технологии управления
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'boldyreva',
      markup: `
         <p class="popup-info-subtitle">
            Базы данных базы данных и знаний <br>  
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'dashkov',
      markup: `
         <p class="popup-info-subtitle">
            Дизайн-мышление <br>
            Архитектура предприятия <br>
            Архитектура предприятия и цифровые бизнес-модели <br>
            Проектирование бизнес-модели <br>
            Управление личной эффективностью и лидерство <br>
            Стратегическое мышление
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'oreshina',
      markup: `
         <p class="popup-info-subtitle">
            Информационные технологии в управлении <br>
            Информационные технологии <br>
            Информационные технологии в юридической деятельности <br>
            Управление личными знаниями и эффективностью <br>
            Информационная система и организация <br>
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'makarenko',
      markup: `
         <p class="popup-info-subtitle">
            Web-программирование <br>
            Алгоритмизация и программирование <br>
            Информатика и программирование <br>
            Программирование <br>
            Основы web-программирования <br>
            Практикум на ЭВМ
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'antipova',
      markup: `
         <p class="popup-info-subtitle">
            Численные методы <br>
            Дискретная математика <br>
            Прикладная математика <br>
            Теория игр
         </p> 
      `,
      subtitle: 'Старший преподаватель кафедры'
   },
   {
      id: 'gataullin',
      markup: `
         <p class="popup-info-subtitle">
            Методы оптимальных решений <br>
            Эконометрика
         </p> 
      `,
      subtitle: 'Профессор кафедры'
   },
   {
      id: 'egorov',
      markup: `
         <p class="popup-info-subtitle">
            Прикладная математика <br>
            Методы оптимальных решений <br>
            Теория игр <br>
            Случайные процессы и их приложения
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'konstantinova',
      markup: `
         <p class="popup-info-subtitle">
            Методы оптимальных решений <br>
            Многомерные статистические методы <br>
            Теория вероятностей и математическая статистика <br>
            Методы принятия управленческих решений <br>
            Эконометрика <br>
            Математика-2 (Прикладная математика) <br>
            Информационные технологии в экономике
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'kramarenko',
      markup: `
         <p class="popup-info-subtitle">
            Аналитические информационные системы <br>
            Технологии аналитических информационных систем и системы поддержки принятия решений <br>
            Обработка данных в среде офисных приложений <br>
            Методы анализа данных <br>
            Теория измерении и анализ данных <br>
            Эконометрика
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'mishin',
      markup: `
         <p class="popup-info-subtitle">
            Методы и модели оценки деятельности организации экономика организации методы управления конкурентоспособностью организации организация предприятий малого бизнеса организационное проектирование <br>
            Финансовая математика методы финансового анализа финансовый менеджмент финансы финансы организаций деньги кредит банки <br>
            Теория и системы управления <br>
            Производственно-техническое планирование и нормирование <br>
            Бизнес-планирование <br>
            Стратегический анализ
         </p> 
      `,
      subtitle: 'Профессор кафедры'
   },
   {
      id: 'prohorov',
      markup: `
         <p class="popup-info-subtitle">
            Экономико-математическое моделирование <br>
            Математическая экономика <br>
            Прикладная математика <br>
            Теория игр и исследование операций <br>
            Случайные процессы и их приложения 
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'suyazova',
      markup: `
         <p class="popup-info-subtitle">
            Эконометрика <br>
            Эконометрика (продвинутый курс) <br>
            Математическое моделирование <br>
            Аналитический пакет R <br>
            Экономико-математическое моделирование
         </p> 
      `,
      subtitle: 'Старший преподаватель'
   },
   {
      id: 'timofeeva',
      markup: `
         <p class="popup-info-subtitle">
            Алгебра и геометрия <br>
            Методы и модели оценки рисков <br>
            Системный анализ и принятие решений <br>
            Разработка и принятие управляющий решений <br>
            Математика-2 (Прикладная математика) <br>
            Методы оптимальных решений <br>
            ППП компьютерного моделирования <br>
            Имитационное моделирование
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'shananin',
      markup: `
         <p class="popup-info-subtitle">
            Дифференциальные уравнения <br>
            Уравнения математической физики <br>
            Функциональный анализ <br>
            Оптимальное управление <br>
            Методы оптимизации <br>
            Прикладная математика <br>
            Методы оптимальных решений
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'buhtoyarova',
      markup: `
         <p class="popup-info-subtitle">
            Математика
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'gubareva',
      markup: `
         <p class="popup-info-subtitle">
            Математика <br>
            Математический анализ <br>
            Теория вероятностей и математическая статистика         
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'efimova',
      markup: `
         <p class="popup-info-subtitle">
            Математический анализ <br>
            Математика         
         </p> 
      `,
      subtitle: 'Старший преподаватель'
   },
   {
      id: 'kuternin',
      markup: `
         <p class="popup-info-subtitle">
            Математика <br>
            Математический анализ <br>
            Теория вероятностей и математическая статистика <br>
            Прикладная математика <br>
            Исследование операций <br>
            Прикладная статистика         
         </p> 
      `,
      subtitle: 'Профессор кафедры'
   },
   {
      id: 'nolde',
      markup: `
         <p class="popup-info-subtitle">
            Математика <br>
            Математический анализ         
         </p> 
      `,
      subtitle: 'Старший преподаватель'
   },
   {
      id: 'parshikova',
      markup: `
         <p class="popup-info-subtitle">
            Математический анализ <br>
            Математика         
         </p> 
      `,
      subtitle: 'Старший преподаватель'
   },
   {
      id: 'silaev',
      markup: `
         <p class="popup-info-subtitle">
            Математический анализ <br>
            Математика <br>
            Прикладная математика         
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
   {
      id: 'tararin',
      markup: `
         <p class="popup-info-subtitle">
            Математика <br>
            Дискретная математика <br>
            Прикладная математика         
         </p> 
      `,
      subtitle: 'Доцент кафедры'
   },
];