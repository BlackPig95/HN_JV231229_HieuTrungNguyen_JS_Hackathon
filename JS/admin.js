const projectName = document.querySelector("#project-name");
const imageURL = document.querySelector("#image-url");
const livePreview = document.querySelector("#live-preview");
const techTag = document.querySelector("#tech-tag");
const form = document.querySelector("form");
const tableBody = document.querySelector("#table-body");
const buttonSubmit = document.querySelector("#button-submit");
let editIndex = -1;

//Khởi tạo dữ liệu ban đầu, có chỉnh sửa cho phù hợp hơn
let heroInfo = {
    name: "Hieu Trung Nguyen",
    job: "freelance react developer",
    image: "../Images/Avatar.jpg",
};
localStorage.setItem("hero-data", JSON.stringify(heroInfo));//Khởi tạo dữ liệu ban đầu của section hero

let personalDetail = {//Vì sử dụng trang porfolio khác (đề 2 của hackathon trước) nên có một số mục không cần dùng đến
    name: "Trung Hiếu",
    dob: "29 April 1995",
    spokenLanguages: [ "English", "Japanese", "Vietnamese" ],
    nationality: "Vietnam",
    interest: [ "Music", "Reading", "Games" ],
    techs: [ //Chỉ cần sử dụng phần này cho mục TechStack
        {
            id: 1,
            imgUrl: "https://i.postimg.cc/cHdfNH2Z/android.png",
            techName: "Android",
            exp: "2", //Để exp dưới dạng string để khi push lên localStorage không bị chia thành số thập phân
        },
        {
            id: 2,
            imgUrl: "https://i.postimg.cc/nrCjHQk8/Angular.png",
            techName: "Angular",
            exp: "1",
        },
        {
            id: 3,
            imgUrl: "https://i.postimg.cc/G3VJ4csP/bootstrap.png",
            techName: "Bootstrap",
            exp: "3",
        },
        {
            id: 4,
            imgUrl: "https://i.postimg.cc/dt91z6v7/vue.png",
            techName: "Vue",
            exp: "2",
        },
        {
            id: 5,
            imgUrl: "https://i.postimg.cc/XNdXg3zk/react.png",
            techName: "React",
            exp: "2 / 3",
        },
        {
            id: 6,
            imgUrl: "https://i.postimg.cc/PfgYt2B2/mongodb.png",
            techName: "Mongodb",
            exp: "0.25",
        },
        {
            id: 7,
            imgUrl: "https://i.postimg.cc/RZzFYYjx/laravel.png",
            techName: "Laravel",
            exp: "1",
        },
        {
            id: 8,
            imgUrl: "https://i.postimg.cc/X7N3ybSJ/nodejs-icon.png",
            techName: "Node.js",
            exp: "5 / 6",
        },
    ],
};
localStorage.setItem("personal-data", JSON.stringify(personalDetail));//Khởi tạo dữ liệu ban đầu của mục Tech Stack

let initialProjects = [ //Dữ liệu khởi tạo ban đầu theo yêu cầu, có chỉnh sửa lại cho phù hợp với code đã viết
    {
        id: 1,
        image: "https://i.postimg.cc/nrCjHQk8/Angular.png",
        name: "Auto Drive Project",
        preview: "https://abcd-example.com",
        tag: "Angular, React, Jquery",
    },
    {
        id: 2,
        image: "https://i.postimg.cc/G3VJ4csP/bootstrap.png",
        name: "Ecommerce Project",
        preview: "https://abcd-example.com",
        tag: "Bootstrap, CSS, Javascript",
    },
    {
        id: 3,
        image: "https://i.postimg.cc/PfgYt2B2/mongodb.png",
        name: "Chat Application",
        preview: "https://abcd-example.com",
        tag: "MongoDB, Javascript",
    },
    {
        id: 4,
        image: "https://i.postimg.cc/dt91z6v7/vue.png",
        name: "Social Media Platform",
        preview: "https://abcd-example.com",
        tag: "Vue, Javascript",
    },
    {
        id: 5,
        image: "https://i.postimg.cc/XNdXg3zk/react.png",
        name: "Image Sharing Platform",
        preview: "https://abcd-example.com",
        tag: "React, Javascript",
    },
];
localStorage.setItem("project-data", JSON.stringify(initialProjects));//Khởi tạo dữ liệu localStorage ban đầu theo yêu cầu về projects
//Add listener
form.addEventListener("submit", (e) =>
{
    e.preventDefault();
    const projectData = JSON.parse(localStorage.getItem("project-data")) || [];
    const newProject = {
        id: projectData.length + 1,
        name: projectName.value,
        image: imageURL.value,
        preview: livePreview.value,
        tag: techTag.value,
    };
    if (!ValidateInput(projectName.value, imageURL.value, livePreview.value, techTag.value))
    {
        return alert("Không được để trống bất kỳ trường nào");
    }
    if (editIndex !== -1)
    {
        console.log(editIndex);
        projectData[ editIndex ].name = projectName.value;
        projectData[ editIndex ].image = imageURL.value;
        projectData[ editIndex ].preview = livePreview.value;
        projectData[ editIndex ].tag = techTag.value;
        localStorage.setItem("project-data", JSON.stringify(projectData));
        buttonSubmit.innerHTML = `<i class="fa-solid fa-plus"></i>New Project`;
        editIndex = -1;
        projectName.value = "";
        imageURL.value = "";
        livePreview.value = "";
        techTag.value = "";
    }
    else
    {
        projectData.push(newProject);
        localStorage.setItem("project-data", JSON.stringify(projectData));
        projectName.value = "";
        imageURL.value = "";
        livePreview.value = "";
        techTag.value = "";
    }

    RenderProject();
});

//Render dữ liệu ra màn hình
function RenderProject()
{
    tableBody.innerHTML = "";//Reset lại bảng để tránh hiển thị đè lên dữ liệu cũ
    const projectData = JSON.parse(localStorage.getItem("project-data")) || [];//Lấy dữ liệu local về dưới dạng mảng
    const newFragment = document.createDocumentFragment();//Tạo fragment mới để giảm bớt quá trình render
    for (let i = 0; i < projectData.length; i++)
    {
        let tempProject = projectData[ i ];//Tạo biến temp để lưu từng object lấy ra trong mảng

        let tagsProvided = tempProject.tag.trim().split(",");//Chia nhỏ các tags bằng cách lược bỏ dấu phẩy và white space
        const tagFragment = document.createDocumentFragment();//Tạo fragment để gắn các tag vào

        for (let i = 0; i < tagsProvided.length; i++)
        {
            let newSpan = document.createElement("span");//Tạo thẻ span cho mỗi tech tag để đi CSS
            newSpan.innerHTML += `${ tagsProvided[ i ] }`;
            newSpan.classList.add("tag-span");//Thêm class vào để đi CSS
            tagFragment.appendChild(newSpan); //Gắn các thẻ span vào fragment
        }//Vì cần tách các trường đã nhập nên phải làm theo cách này

        const newTr = document.createElement("tr"); //Tạo thẻ tr mới
        newTr.innerHTML += `
            <td>${ tempProject.id }</td>
            <td>${ tempProject.name }</td>
            <td> <img alt="photo${ i }"src="${ tempProject.image }" style="width: 5rem; height: 4rem;""/> </td>
            <td>${ tempProject.preview }</td>
            <td></td>
            <td>
            <button onclick="DeleteProject(${ i })">Delete</button>
            <button onclick="UpdateProject(${ i })">Update</button>
            </td>
        `;
        newTr.children[ 4 ].appendChild(tagFragment);//Gắn tag fragment vào thẻ td thứ 5 (index=4)
        newFragment.append(newTr);//Gắn thẻ mới tạo vào fragment thay vì render ra ngay trong vòng lặp
    }
    tableBody.appendChild(newFragment);//Gắn fragment vào chỉ 1 lần => Web page chỉ cần render 1 lần
}
RenderProject();
//Delete Function
function DeleteProject(index)
{
    const getProjectData = JSON.parse(localStorage.getItem("project-data"));
    getProjectData.splice(index, 1);
    for (let i = 0; i < getProjectData.length; i++)
    {
        getProjectData[ i ].id = i + 1;
    }
    localStorage.setItem("project-data", JSON.stringify(getProjectData));
    RenderProject();
}
//Update Function
function UpdateProject(index)
{
    const getProjectData = JSON.parse(localStorage.getItem("project-data"));
    projectName.value = getProjectData[ index ].name;
    imageURL.value = getProjectData[ index ].image;
    livePreview.value = getProjectData[ index ].preview;
    techTag.value = getProjectData[ index ].tag;
    editIndex = index;
    buttonSubmit.innerHTML = "Update";
}
//Validate input
function ValidateInput(_name, _image, _preview, _tag)
{
    if (_name === "")
    {
        return false;
    }
    if (_image === "")
    {
        return false;
    }
    if (_preview === "")
    {
        return false;
    }
    if (_tag === "")
    {
        return false;
    }
    return true;
}