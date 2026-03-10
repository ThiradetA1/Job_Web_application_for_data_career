const cardContainer = document.getElementById('card-container');
const url = 'data.json'; 

async function fetchAndRenderCards() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <div class="card-content">
                    <h3 class="card-title">${item.job_title}</h3>
                    <span class="card-tag-company"> ${item.company_industry}</span>
                    <span class="card-tag-remote">${item.remote_type}</span>
                    <p class="card-tag-salary"> salary : ${item.salary}</p>
                    <p class="card-body"> country : ${item.country}</p>
                    <p class="card-body"> Posting Year : ${item.job_posting_year}</p>
                    <button><a href="jobdetail.html?id=${item['job_id']}">Apply Job</a></button>
                </div>
            `;

            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Could not fetch data: ", error);
    }
}

fetchAndRenderCards();


fetch(url)
    .then(response => response.json())
    .then(data => {
        // 1. นับจำนวนข้อมูลทั้งหมดที่ได้มา
        const totalJobs = data.length; 
        
        // 2. เอาตัวเลขไปใส่ใน <p id="total-count">
        document.getElementById('total-count').innerText = `All jobs: ${totalJobs} รายการ`;

        // 3. หลังจากนั้นค่อยรันโค้ดสร้าง Card ของคุณต่อ...
        // data.forEach(item => { ... สร้าง card ... })
    })
    .catch(error => {
        console.error("Error:", error);
    });