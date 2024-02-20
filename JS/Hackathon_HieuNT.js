//Hiển thị dữ liệu từ localstorage ra mục Projects
const projectDetail = document.querySelector(".project-detail");
const getLocalProject = JSON.parse(localStorage.getItem("project-data")) || [];
function RenderProject()
{
    for (let i = 0; i < getLocalProject.length; i++)
    {
        const newDiv = document.createElement("div");
        newDiv.innerHTML += `
    <img style="width: 23.4375rem; height: 16.25rem;" alt="photo${ i }"
    src="${ getLocalProject[ i ].image }" />
<p>${ getLocalProject[ i ].name }</p>
<p>This is sample project description random things are here in description. This is sample project
    Lorem ipsum dolor sit amet consectetur.</p>
<p>Tech stack: <span>${ getLocalProject[ i ].tag }</span></p>
<div class="project-link">
    <div>
        <img style="width: 1.25rem; height: 1.25rem;" alt="icon1"
            src="../Images/TechImages/akar-icons_link-chain.png" />
        <span><a style="color: black" href="${ getLocalProject[ i ].preview }">Live Preview</a></span>
    </div>
    <div>
        <img style="width: 1.25rem; height: 1.25rem;" alt="icon2"
            src="../Images/TechImages/akar-icons_github-fill.png" />
        <span><a style="color: black;" href="#">View Code</a></span>
    </div>
</div>
    `;
        projectDetail.appendChild(newDiv);
    }
}
RenderProject();
//Hiển thị dữ liệu từ localstorage ra mục Hero (Giới thiệu bản thân)
const getLocalHero = JSON.parse(localStorage.getItem("hero-data")) || {};
const myName = document.getElementById("my-name");
myName.textContent = getLocalHero.name;
//Hiển thị hình ảnh ở mục Hero lấy ra từ localstorage
const myAvatar = document.getElementById("avatar-img");
myAvatar.src = getLocalHero.image;

//Hiển thị mục Tech Stack bằng giá trị lấy ra từ localstorage
const getLocalPersonal = JSON.parse(localStorage.getItem("personal-data")) || {};
const techStackIcon = document.querySelector(".tech-icon");
let techArray = getLocalPersonal.techs; //Lấy ra array đã lưu trong object personalDetail ở localStorage

function RenderTechStack()
{
    for (let i = 0; i < techArray.length; i++) //Mỗi index của array này là một object
    {
        const newDiv = document.createElement("div");//Tạo thẻ div mới để lưu các trường thông tin vào chung
        const exp = document.createElement("span");//Tạo thẻ mới để lưu thông tin về số năm kinh nghiệm
        const technology = document.createElement("span");//Lưu thông tin về tên của công nghệ đã học
        exp.textContent = techArray[ i ].exp + " Years Experience";//Gán giá trị exp từ localStorage
        technology.textContent = techArray[ i ].techName;
        technology.classList.add("technology"); //Thêm class để đi CSS cho tên công nghệ
        const newImg = document.createElement("img");
        newImg.src = techArray[ i ].imgUrl;
        newImg.alt = techArray[ i ].techName;
        newImg.classList.add("tech-icon-img");//Thêm class để đi CSS cho ảnh
        const childDiv = document.createElement("div");//Tạo ra một thẻ div con bên trong để đi CSS
        newDiv.appendChild(newImg);
        childDiv.appendChild(technology);
        childDiv.appendChild(document.createElement("br"));//Thêm thẻ break để cách dòng
        childDiv.appendChild(exp);
        newDiv.appendChild(childDiv);
        newDiv.classList.add("tech-icon-item");//Thêm class để đi CSS cho từng mục
        techStackIcon.appendChild(newDiv);
    }//Tạo thẻ kiểu này mất thời gian và khó hơn nhưng performance và security tốt hơn so với dùng innerHTML cộng chuỗi
}
RenderTechStack();

//Thay đổi màu thành nav bar khi scroll
const nav = document.getElementById("nav-container");
window.onscroll = function ()
{
    if (window.scrollY >= 100)
    {
        nav.classList.add("nav-colored");
    }
    else
    {
        nav.classList.remove("nav-colored");
    }
};
console.log(nav);