try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.lang="ar-MA";
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var instructions2 = $('#recording-instructions2');
var instructions3 = $('#recording-instructions3');
var instructions4 = $('#recording-instructions4');
var notesList = $('ul#notes');

var noteContent = '';

// Get all notes from previous sessions and display them.
var notes = getAllNotes();
renderNotes(notes);



/*-----------------------------
      Voice Recognition 
------------------------------*/
recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }
};

recognition.onspeechend = function() {
  instructions.text('لقد كنت هادئًا لفترة من الوقت ، لذا أوقف التعرف على الصوت نفسه');
  instructions2.text('لقد كنت هادئًا لفترة من الوقت ، لذا أوقف التعرف على الصوت نفسه');
  instructions3.text('لقد كنت هادئًا لفترة من الوقت ، لذا أوقف التعرف على الصوت نفسه');
  instructions4.text('لقد كنت هادئًا لفترة من الوقت ، لذا أوقف التعرف على الصوت نفسه');
}

// recognition.onerror = function(event) {
//   if(event.error == 'no-speech') {
//     instructions.text('لم يتم الكشف عن الكلام. حاول مرة أخرى.');  
//     instructions2.text('لم يتم الكشف عن الكلام. حاول مرة أخرى.'); 
//     instructions3.text('لم يتم الكشف عن الكلام. حاول مرة أخرى.'); 
//     instructions4.text('لم يتم الكشف عن الكلام. حاول مرة أخرى.'); 
//   }
// };




/*-----------------------------
      App buttons and input 1 
------------------------------*/

$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
  recognition.onstart = function() { 
  instructions.text('تم تفعيل التعرف على الصوت. حاول التحدث في الميكروفون');
}
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('لم يتم الكشف عن الكلام. حاول مرة أخرى');  
  }
};

});

noteTextarea.on('input', function() {
  noteContent = $(this).val();
})

$('#pause-record-btn').on('click', function(e) {
  recognition.stop();

  if(!noteContent.length) {
    instructions.text('تعذر حفظ ملاحظة فارغة. الرجاء إضافة رسالة إلى ملاحظتك');
  }
  else {

    if (noteContent ==='ما عمري'||noteContent ==='معمري'||noteContent ==='عمري'||noteContent ==='مره مره'||noteContent ==='مر مره'||noteContent ==='مرمره'||noteContent ==='شويه'||noteContent ==='بزاف'){
      saveNote(new Date().toLocaleString(), noteContent);
      instructions.text('تم حفظ الملاحظة بنجاح');
    }
    else{
      alert('Khtiyar machi megboul');
      instructions.text('اضغط على زر بدء التعرف واسمح بالوصول');
    }
    noteContent = '';
    renderNotes(getAllNotes());
    noteTextarea.val('');
  }
      
})


notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);

  if(target.hasClass('delete-note')) {
    var dateTime = target.siblings('.date').text();  
    deleteNote(dateTime);
    target.closest('.note').remove();
  }
});

/*-----------------------------
      App buttons and input 2 
------------------------------*/

$('#start-record-btn2').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();  
  recognition.onstart = function() { 
  instructions2.text('تم تفعيل التعرف على الصوت. حاول التحدث في الميكروفون');
}
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions2.text('لم يتم الكشف عن الكلام. حاول مرة أخرى'); 
  }
};

});

noteTextarea.on('input', function() {
  noteContent = $(this).val();
})

$('#pause-record-btn2').on('click', function(e) {
  recognition.stop();

  if(!noteContent.length) {
    instructions2.text('تعذر حفظ ملاحظة فارغة. الرجاء إضافة رسالة إلى ملاحظتك');
  }
  else{
    if (noteContent ==='ما عمري'||noteContent ==='معمري'||noteContent ==='عمري'||noteContent ==='مره مره'||noteContent ==='مر مره'||noteContent ==='مرمره'||noteContent ==='شويه'||noteContent ==='بزاف'){
      saveNote(new Date().toLocaleString(), noteContent);
      instructions2.text('تم حفظ الملاحظة بنجاح');
    }
    else{
      alert('Khtiyar machi megboul');
      instructions2.text('اضغط على زر بدء التعرف واسمح بالوصول');
    }
    noteContent = '';
    renderNotes(getAllNotes());
    noteTextarea.val('');
  }
      
})

notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);

  if(target.hasClass('delete-note')) {
    var dateTime = target.siblings('.date').text();  
    deleteNote(dateTime);
    target.closest('.note').remove();
  }
});




/*-----------------------------
      App buttons and input 3 
------------------------------*/

$('#start-record-btn3').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
  recognition.onstart = function() { 
  instructions3.text('تم تفعيل التعرف على الصوت. حاول التحدث في الميكروفون');
}
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions3.text('لم يتم الكشف عن الكلام. حاول مرة أخرى'); 
  }
};

});

noteTextarea.on('input', function() {
  noteContent = $(this).val();
})

$('#pause-record-btn3').on('click', function(e) {
  recognition.stop();

  if(!noteContent.length) {
    instructions3.text('تعذر حفظ ملاحظة فارغة. الرجاء إضافة رسالة إلى ملاحظتك');
  }
  else{
    if (noteContent ==='ما عمري'||noteContent ==='معمري'||noteContent ==='عمري'||noteContent ==='مره مره'||noteContent ==='مر مره'||noteContent ==='مرمره'||noteContent ==='شويه'||noteContent ==='بزاف'){
      saveNote(new Date().toLocaleString(), noteContent);
      instructions3.text('تم حفظ الملاحظة بنجاح');
    }
    else{
    alert('اختيار ماشي مقبول');
    instructions3.text('اضغط على زر بدء التعرف واسمح بالوصول');
    }
    noteContent = '';
    renderNotes(getAllNotes());
    noteTextarea.val('');
  }
      
})

notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);

  if(target.hasClass('delete-note')) {
    var dateTime = target.siblings('.date').text();  
    deleteNote(dateTime);
    target.closest('.note').remove();
  }
});



/*-----------------------------
      App buttons and input 4 
------------------------------*/

$('#start-record-btn4').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
  recognition.onstart = function() { 
  instructions4.text('');
}
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions4.text('لم يتم الكشف عن الكلام. حاول مرة أخرى'); 
  }
};

});

noteTextarea.on('input', function() {
  noteContent = $(this).val();
})

$('#pause-record-btn4').on('click', function(e) {
  recognition.stop();

  if(!noteContent.length) {
    instructions4.text('تعذر حفظ ملاحظة فارغة. الرجاء إضافة رسالة إلى ملاحظتك');
  }
  else{
    if (noteContent ==='ما عمري'||noteContent ==='معمري'||noteContent ==='عمري'||noteContent ==='مره مره'||noteContent ==='مر مره'||noteContent ==='مرمره'||noteContent ==='شويه'||noteContent ==='بزاف'){
      saveNote(new Date().toLocaleString(), noteContent);
      instructions4.text('تم حفظ الملاحظة بنجاح');      
    }
    else{
      alert('Khtiyar machi megboul');
      instructions4.text('اضغط على زر بدء التعرف واسمح بالوصول');
    }
    noteContent = '';
    renderNotes(getAllNotes());
    noteTextarea.val('');

  }
      
})

notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);

  if(target.hasClass('listen-note')) {
    var content = target.closest('.note').find('.content').text();
    readOutLoud(content);
  }

  if(target.hasClass('delete-note')) {
    var dateTime = target.siblings('.date').text();  
    deleteNote(dateTime);
    target.closest('.note').remove();
  }
});

// /*-----------------------------
//       Speech Synthesis 
// ------------------------------*/

// function readOutLoud(message) {
// 	var speech = new SpeechSynthesisUtterance();

//   // Set the text and voice attributes.
// 	speech.text = message;
// 	speech.volume = 1;
// 	speech.rate = 1;
// 	speech.pitch = 1;
  
// 	window.speechSynthesis.speak(speech);
// }



/*-----------------------------
      Helper Functions 
------------------------------*/

function renderNotes(notes) {
  var html = '';
  var num=1;  
  if(notes.length) {
    notes.forEach(function(note) {
      html+= `<li class="note">
        <p class="header">
          <span class="date">${note.date}</span>
          <a href="#" class="delete-note" title="Delete">حذف</a>
        </p>
        <p class="num">${num}</p>
        <p class="content">${note.content}</p>
      </li>`;
      num=num+1;    
    });
  }
  else {
    html = '<li><p class="content">ليس لديك أية ملاحظات حتى الآن</p></li>';
  }


  notesList.html(html);
}


function saveNote(dateTime, content,num) {
  localStorage.setItem('note-' + dateTime, content,num);
}


function getAllNotes() {
  var notes = [];
  var key;
  for (var i = 0; i < localStorage.length; i++) {    
      key = localStorage.key(i);
      if(key.substring(0,5) == 'note-') {
        notes.push({
          content: localStorage.getItem(key),
          date: key.replace('note-',''),          
        });
      }   
  }
  notes =notes.sort(function (a, b) {
    return a.date.localeCompare(b.date);
});
  return notes;
}
console.log(notes);

function deleteNote(dateTime) {
  localStorage.removeItem('note-' + dateTime); 
}

