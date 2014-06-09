var questions = [
  {
    question: 'Cycle:',
    answers: ['for', 'var', 'while/do whil', 'typeof', 'function'],
    correct_answer: [0, 3],
    position: 0
  },
   {
    question: 'Search for DOM-items:',
    answers: ['search', 'document.getElementById', 'window', 'document.getElementsByClass', 'document.getElementByClass'],
    correct_answer: [1, 3],
    position: 1
  },
  {
    question: '(function(){\
                return typeof arguments;\
              })();',
    answers: ['"object"', '"array"', '"arguments"', '"undefined"'],
    correct_answer: [0],
    position: 2
  },
  {
    question: 'var f = function g(){ return 23; };\
              typeof g();',
    answers: ['"number"', '"undefined"', '"function"', 'Error'],
    correct_answer: [3],
    position: 3
  },
  {
    question: '(function(x){\
             delete x;\
             return x;\
            })(1);',
    answers: ['1', 'null', 'undefined', 'Error'],
    correct_answer: [0],
    position: 4
  },
  {
    question: 'var y = 1, x = y = typeof x;\
            x;',
    answers: ['1', '"number"', 'undefined', '"undefined"'],
    correct_answer: [3],
    position: 5
  },
  {
    question: '(function f(f){\
                  return typeof f();\
              })(function(){ return 1; });',
    answers: ['"number"', '"undefined"', '"function"', 'Error'],
    correct_answer: [0],
    position: 6
  },
  {
    question: 'var f = (function f(){ return "1"; }, function g(){ return 2; })();\
               typeof f;',
    answers: ['"string"', '"number"', '"function"', '"undefined"'],
    correct_answer: [1],
    position: 7
  },
  {
    question: '(function f(){\
                  function f(){ return 1; }\
                return f();\
              function f(){ return 2; }\
              })();',
    answers: ['1', '2', 'Error (e.g. "Too much recursion")', 'undefined'],
    correct_answer: [1],
    position: 8
  },
];

function validate_form() {
  valid = true;
  if(document.contact_form.login.value == '') {
      // alert ('Pleas, enter your name!');
      var errorName = document.getElementById('error_name');
      errorName.style.display = 'block';
      valid = false;
  }
  if(document.contact_form.pass.value == '') {
    var errorPass = document.getElementById('error_pass');
    // console.log(errorPass);
    errorPass.style.display = 'block';
    valid = false;
  }
  return valid;
}


var wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.appendChild(wrapper);

wrapper.innerHTML = '\
  <form id="login_form" name="contact_form">\
    <div class="login">\
      <label for="login">User Name</label>\
      <input type="text" id="login">\
      <div id="error_name">Pleas, enter your name!</div>\
    </div>\
    <div class="pass">\
      <label for="pass">User Password</label>\
      <input type="password" id="pass">\
      <div id="error_pass">Pleas, enter your password!</div>\
    </div>\
    <input type="submit" value="LOGIN" id="submit">\
  </form>\
';

var form = document.getElementById('login_form');

var submit = document.getElementById('submit');
submit.addEventListener('click', function(event) {
  event.preventDefault();
  if (!validate_form()) {
  wrapper.removeChild(form);
  renderPos(7);
  }
});

function finishTest() {
  console.log('finishTest');
}

function renderPos(position) {
  window.q = questions[position];

  wrapper.innerHTML = '\
    <div id="question_wrapper">\
      <div id="question">' + q.question + '</div>\
      <div id="answer">\
      </div>\
      <div id="buttons">\
        <a href="#" id="previous"><< Previous</a>\
        <a href="#" id="next">Next >></a>\
      </div>\
    </div>\
  ';


  var questionDom = document.getElementById('question');
  var answerDom = document.getElementById('answer');

  for (var index in q.answers) {
    answerDom.innerHTML += '<div><input type="checkbox" name="checkbox_name">' + q.answers[index] + '</div>'
  }

  var next = document.getElementById('next');
  var previous = document.getElementById('previous');
  if (position == 0) {
    previous.setAttribute('class', 'disabled');
  }

  next.addEventListener ('click', function(event) {
    event.preventDefault();

    console.log(position + 1);

    if ((questions[position+1]) == undefined) {
      finishTest();
      return;
    }

    var checkboxArr = document.getElementsByName('checkbox_name');

    q.user_answers = [];

    for (var i = 0; i < checkboxArr.length; i++) {
      if (checkboxArr[i].checked == true) {
        q.user_answers.push(true);
      }
      else {
        q.user_answers.push(false);
      }
    }

    renderPos(questions[position].position + 1);
  });
  if (position !== 0) {
    previous.addEventListener ('click', function(event) {
      event.preventDefault();
      renderPos(questions[position].position - 1);
    });
  }

};



