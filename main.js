
let ids_used = [];

let prathmtask = [];

let prathmstartdate = [];

let prathmenddate = [];

// validate dates for subtask
function validateDatefor_sub(MT_sdate, MT_ldate, ST_sdate, ST_ldate) {
    MT_sdate = Date.parse(MT_sdate);  // main task start date
    MT_ldate = Date.parse(MT_ldate);  // main task end date
    ST_sdate = Date.parse(ST_sdate);  // subtask start date
    ST_ldate = Date.parse(ST_ldate);  // subtask end date

    if (ST_sdate < MT_sdate && ST_ldate > MT_ldate) {
        return "your subtask is started before and ended after main task";
    }
    else if (ST_sdate < MT_sdate) {
        return "your subtask is started before";
    }
    else if (ST_ldate > MT_ldate) {
        return "your subtask is ended after main task";
    }
    if(ST_ldate < ST_sdate)
    {
        return "your sub task's start date is after end date of subtask"
    }

    return "ok";
}

// validate dates for main task
function validateDate(fromdate, todate) {
    
    let today = new Date();
    
    let mm = today.getMonth() +1;

    let yyyy = today.getFullYear();

    let dd = today.getDate();

    let current_date = yyyy + "-" + mm + "-" + "dd";

    let d1 = Date.parse(fromdate);
    let d2 = Date.parse(todate);
    let d3 = Date.parse(current_date);

    console.log(fromdate);

    if (d2 < d1) {
        return "enddate is lessthan start date";
    }
    if(d2 < current_date)
    {
        
    }

}

window.addEventListener('load', () => {
    const task_form = document.querySelector("#new-task-form");
    const subtask_form = document.querySelector("#sub-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const idIncrement = document.querySelector("#maintask-id").value;

   

    task_form.addEventListener("submit", (e) => {

        let taskid = document.getElementById("maintask-id").value;
        let taskName = document.getElementById("new-task-input").value;
        let startDate = document.getElementById("task-start-date").value;
        let endDate = document.getElementById("task-end-date").value;
        let status = document.getElementById("task-status").value;
        const tab_body = document.querySelector("#tab_body");

        // prevent from submitting the form and go to another page or refresh
        e.preventDefault();

        let date_comparision = validateDate(startDate, endDate);
        if (date_comparision == "enddate is lessthan start date") {
            alert("enddate is lessthan start date");
            return;
        }

        // if ids are not present or id is not included before
        if (ids_used.length < 1 || !ids_used.includes(taskid)) {

            prathmstartdate.push(startDate);
            prathmenddate.push(endDate);
            ids_used.push(taskid);

            prathmtask.push(taskid);
            // creating row start

             var tab_row_el = document.createElement("tr"); 
 
             const tab_data_el1 = document.createElement("td"); // 1st
             tab_data_el1.innerText = taskid;
 
             var tab_data_el2 = document.createElement("td"); // 2nd
             tab_data_el2.innerText = taskName;
 
             const tab_data_el3 = document.createElement("td"); // 3rd
             tab_data_el3.innerText = startDate;
 
             const tab_data_el4 = document.createElement("td"); // 4th
             tab_data_el4.innerText = endDate;
 
             const tab_data_el5 = document.createElement("td"); // 5th
             tab_data_el5.innerText = status;
 
             const tab_data_el6 = document.createElement("td"); // 6th
             var edit_btn = document.createElement("button");
 
             edit_btn.classList.add("edit");
             edit_btn.innerText = "EDIT";
 
             tab_data_el6.appendChild(edit_btn);
        
 
             const tab_data_el7 = document.createElement("td"); // 7th
             var del_btn = document.createElement("button");
            
             del_btn.classList.add("delete");
             del_btn.innerText = "DELETE";
 
             tab_data_el7.appendChild(del_btn);
             

             tab_row_el.appendChild(tab_data_el1);
             tab_row_el.appendChild(tab_data_el2);
             tab_row_el.appendChild(tab_data_el3);
             tab_row_el.appendChild(tab_data_el4);
             tab_row_el.appendChild(tab_data_el5);
             tab_row_el.appendChild(tab_data_el6);
             tab_row_el.appendChild(tab_data_el7);
 
             tab_body.appendChild(tab_row_el);
            // creating row end
        }
        else {
            alert("id is already present");
        }

        // event listner of edit button
        edit_btn.addEventListener("click", () => {

            if (edit_btn.innerText.toLowerCase() == "edit") {
                let getText = prompt("edit text", "");
                tab_data_el2.innerText = getText;
                edit_btn.innerText = "save";
            }
            else {
                edit_btn.innerText = "edit";
                tasks--;
            }

        });

        del_btn.addEventListener("click", () => {
            tab_body.removeChild(tab_row_el);
            prathmtask.pop;
            prathmstartdate.pop;
            prathmenddate.pop;
        });

    });

    let increment = 1;
    subtask_form.addEventListener("submit", (e) => {
        let taskName = document.getElementById("sub-task-input").value;
        let startDate = document.getElementById("subtask-start-date").value;
        let endDate = document.getElementById("subtask-end-date").value;
        let status = document.getElementById("subtask-status").value;
        const tab_body = document.querySelector("#tab_body");

        // prevent from submitting the form and go to another page or refresh
        e.preventDefault();

        
        if (tasks < 1) {
            alert("please add your task before adding subtask");
            return;
        }
        else {
           // let maintask_id = tasks[(tasks.length - 1)];
            
           let maintask_id = prathmtask[(prathmtask.length-1)];
        
           maintask_id = maintask_id + ".";

           let flot1 = String(increment);
           increment++;

           maintask_id += flot1;

            let s_date = prathmstartdate;
            let l_date = prathmenddate;

            let date_comparision = validateDatefor_sub(s_date, l_date, startDate, endDate);

            if (date_comparision !== "ok") {
                alert(date_comparision);
                increment--;
                return;
            }


            // creating row start
             var tab_row_el = document.createElement("tr"); 
 
             const tab_data_el1 = document.createElement("td"); // 1st
             tab_data_el1.innerText = maintask_id;
 
             var tab_data_el2 = document.createElement("td"); // 2nd
             tab_data_el2.innerText = taskName;
 
             const tab_data_el3 = document.createElement("td"); // 3rd
             tab_data_el3.innerText = startDate;
 
             const tab_data_el4 = document.createElement("td"); // 4th
             tab_data_el4.innerText = endDate;
 
             const tab_data_el5 = document.createElement("td"); // 5th
             tab_data_el5.innerText = status;

              const tab_data_el6 = document.createElement("td"); // 6th
             var edit_btn = document.createElement("button");
 
             edit_btn.classList.add("edit");
             edit_btn.innerText = "EDIT";
 
             tab_data_el6.appendChild(edit_btn);
        
             const tab_data_el7 = document.createElement("td"); // 7th
             var del_btn = document.createElement("button");
            
             del_btn.classList.add("delete");
             del_btn.innerText = "DELETE";
 
             tab_data_el7.appendChild(del_btn);
 
             tab_row_el.appendChild(tab_data_el1);
             tab_row_el.appendChild(tab_data_el2);
             tab_row_el.appendChild(tab_data_el3);
             tab_row_el.appendChild(tab_data_el4);
             tab_row_el.appendChild(tab_data_el5);
             tab_row_el.appendChild(tab_data_el6);
             tab_row_el.appendChild(tab_data_el7);
 
             tab_body.appendChild(tab_row_el);

             // creating row end
        }

         edit_btn.addEventListener("click", () => {


            if (edit_btn.innerText.toLowerCase() == "edit") {
                let getText = prompt("edit text", "");
                tab_data_el2.innerText = getText;
                edit_btn.innerText = "save";
            }
            else {
                edit_btn.innerText = "edit";
            }

        });

        del_btn.addEventListener("click", () => {

            tab_body.removeChild(tab_row_el);
            increment--;

        });
    });
});

// Ecma script
// this is updated javascript
// it is more secure
/*
const searchFun = () =>{

}
*/

function searchFun()
{
    let filter = document.getElementById("search_input").value.toLowerCase();

    let myTable = document.getElementById("myTable");

    // beause we are geting by tag and tr is a tag
    // under myTable get tr tag
    let tr = myTable.getElementsByTagName("tr");

    for(let i = 0 ; i < tr.length ; i++)
    {
        // get tr tags first row and get the 0th td of that tr

        // searching all the columns till status
        for(let j = 0 ; j < 5 ; j++)
        {
            let td = tr[i].getElementsByTagName("td")[j];

            if(td)
            {
                // gettting the contents of td
                let textvalue = td.textContent;
    
                // checks if the index of filter is present in the textvalue
                if(textvalue.toLowerCase().indexOf(filter) > -1)
                {
                    //                 (= "";) this is for the contents of the row of matching value
                    tr[i].style.display = "";
                    break;
                }
                else
                {
                    // this is for displaying no rows if value is not matching
                    tr[i].style.display = "none";
                }
            }
    
        }
       

    }
}