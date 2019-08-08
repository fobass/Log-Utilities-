"use strict";
const ipc = require('electron').ipcRenderer
const selectDirBtn = document.getElementById('select-directory')
let $ = require('jquery')
let fs = require('fs')
let filename = '2018-11-13_Ticket.log'
let sno = 0

 $(document).ready( ()=> {
    $(document).on('click', '.sidebar-menu .nav-link', (e)=> {
        $(".sidebar-menu").find("li.active").removeClass("active");
        $(e.currentTarget).parent('li').addClass("active");
        console.log("nav clicked", e.currentTarget.id)
        $('#id_content').load(e.currentTarget.id + '.html');
    });

    $(document).on( "click", '#test' , function() {
        console.log("My clicked")
    }); 
});



// $(document).on('click', ()=> {
//     // console.log("My clicked")
//     setActiveNavItem(1)
//   });

//   function setActiveNavItem(item){
//     var navitem = document.getElementById('order_id')
//     // navitem.parent().addClass("active");
//     if (navitem.parentNode.className == "active" || navitem.parentNode.className == "active open" ) {

//         // navitem.parentNode.className = "active";
//         console.log(navitem.className)
//         $(navitem).parent().addClass('active').siblings().removeClass('active');

//     } 
//   }

// selectDirBtn.addEventListener('click', function (event) {
//     ipc.send('open-directory-dialog')
// })

window.addEventListener('contextmenu', (event)=>{
    event.preventDefault()
    ipc.send('show-context-menu')
})

$('#sendIPCSync').on('click', ()=> {
    const reply = ipc.sendSync('somemsg', "Hello world")
    const msg = `Sync message reply: ${reply} - ${sno++}`
    console.log(reply)
    document.getElementById('respICPSync').innerHTML = msg
})

$('#sendIPCAsync').on('click', ()=> {
    const reply = ipc.send('asynchronous-message', 'That one small step for man')
    const msg = `Async message reply: ${reply} - ${sno++}`
    console.log(reply)
    document.getElementById('respICPAsync').innerHTML = msg
    
})
$('#load-to1').on('click', ()=>{
    console.log("test")
})

$(document).ready( function() {
    $("#load-to").on("click", function() {
        console.log("Button Clicked")
    });
});



$('#test').on('click', () => {
    // loadAndDisplayContacts()
    console.log("Button Clicked")
    // let filePath =  $('#filePath').val()
    // console.log(filePath)
    // let logfile = fs.readFile(filePath, (err, data)=>{
    //     if (err) {
    //         return console.log(err);
    //       }
    //       console.log("Asynchronous read: " + data.toString());
    //       addEntry(logfile)
    // })  
})

function addEntry(LogDt, SourceID, OrderDateTime, TicketNo) {
    if (LogDt && SourceID && OrderDateTime && TicketNo) {
        sno++
        let updateString = '<tr><td>' + LogDt + '</td><td>' + SourceID + '</td><td>' +
            OrderDateTime + '</td></tr>' + TicketNo + '</td></tr>'
        $('#log-table').append(updateString)
    }
}

function loadAndDisplayContacts() {

    //Check if file exists
    if (fs.existsSync(filename)) {
        let data = fs.readFileSync(filename, 'utf8').split('\n')

        data.forEach((ticketLog, index) => {
            let [LogDt, SourceID, OrderDateTime, TicketNo] = ticketLog.split('|')
            addEntry(LogDt, SourceID, OrderDateTime, TicketNo)
        })

    } else {
        console.log("File Doesn\'t Exist. Creating new file.")
        fs.writeFile(filename, '', (err) => {
            if (err)
                console.log(err)
        })
    }
}

