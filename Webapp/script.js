const url = 'data.json';
const cardContainer = document.getElementById('card-container'); // ⚠️ ใช้ ID นี้เป็นหลัก

let allJobs = []; // เก็บข้อมูลทั้งหมด
let currentPage = 1;
const itemsPerPage = 30; // จำนวนงานต่อหน้า

// 🚀 สั่ง Fetch ข้อมูลแค่ครั้งเดียวพอ
fetch(url)
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        allJobs = data; 
        
        // อัปเดตตัวเลขจำนวนงานทั้งหมด
        const totalCountEl = document.getElementById('total-count');
        if(totalCountEl) totalCountEl.innerText = `All jobs: ${allJobs.length} Posted`;

        // สั่งให้แสดงข้อมูลหน้าแรก และสร้างปุ่ม
        displayJobs(currentPage);
        setupPagination();
    })
    .catch(error => console.error("Could not fetch data:", error));

// -----------------------------------------
// ฟังก์ชันสำหรับแสดง Card ตามหน้าที่เลือก
// -----------------------------------------
function displayJobs(page) {
    cardContainer.innerHTML = ''; // ล้างข้อมูลเก่าออกก่อน

    // คำนวณจุดเริ่มต้นและจุดสิ้นสุดของข้อมูลในหน้านั้นๆ
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = allJobs.slice(startIndex, endIndex); // ตัดเอาแค่ 30 ตัว

    paginatedItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card'; // ใช้คลาสตามที่คุณเตรียมไว้
        
        // 🛠️ ผมเอาโครงสร้าง HTML แบบเดิมที่คุณเขียนไว้ (ที่มีคลาส card-tag-company) มาใส่ให้แล้ว
        card.innerHTML = `
            <div class="card-content">
                <h3 class="card-title">${item.job_title}</h3>
                <span class="card-tag-company"> ${item.company_industry}</span>
                <span class="card-tag-remote">${item.remote_type}</span>
                <p class="card-tag-salary"> salary : ${item.salary ? item.salary.toLocaleString() : '-'}</p>
                <p class="card-body"> country : ${item.country}</p>
                <p class="card-body"> Posting Year : ${item.job_posting_year}</p>
                <button><a href="jobdetail.html?id=${item.job_id}">Apply Now!</a></button>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

// -----------------------------------------
// ฟังก์ชันคำนวณว่าควรแสดงปุ่มเลขอะไรบ้าง
// -----------------------------------------
function getPaginationNumbers(current, total) {
    if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, '...', total - 1, total];
    if (current >= total - 2) return [1, 2, '...', total - 3, total - 2, total - 1, total];
    return [1, '...', current - 1, current, current + 1, '...', total];
}

// -----------------------------------------
// ฟังก์ชันวาดปุ่มลงหน้าเว็บ
// -----------------------------------------
function setupPagination() {
    const totalPages = Math.ceil(allJobs.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    
    // ถ้าไม่มี <div id="pagination"> ให้หยุดทำงาน จะได้ไม่พัง
    if(!paginationContainer) return; 

    paginationContainer.innerHTML = ''; 

    const pages = getPaginationNumbers(currentPage, totalPages);

    pages.forEach(page => {
        if (page === '...') {
            const span = document.createElement('span');
            span.className = 'page-dots';
            span.innerText = '...';
            paginationContainer.appendChild(span);
        } else {
            const btn = document.createElement('button');
            btn.className = 'page-btn';
            btn.innerText = page;
            
            if (page === currentPage) btn.classList.add('active');

            btn.addEventListener('click', () => {
                currentPage = page;
                displayJobs(currentPage); 
                setupPagination(); 
                window.scrollTo(0, 0); 
            });

            paginationContainer.appendChild(btn);
        }
    });
}