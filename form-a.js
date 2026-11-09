
let clicks = 0;
const labels = ['Submit', 'Resubmit', 'Confirm resubmission', 'Submit confirmation'];

function setup() {
  noCanvas();                          // this page needs no drawing area
  let form = select('#form');          // the <div id="form"> in form-a.html

  createElement('h2', 'Form 27-A').parent(form);


  createP('Full name, in block capitals, one letter per box.').parent(form);
  let name = createInput('');
  name.class('boxes');
  name.attribute('maxlength', 19);     // one fewer than the 20 boxes
  name.parent(form);

  createP('Have you previously submitted this form?').parent(form);
  let prev = createRadio();
  prev.option('Yes');
  prev.option('No');
  prev.option('Not yet');
  prev.parent(form);

  createP('Declaration.').parent(form);
  let agree = createCheckbox('I agree that I do not agree', false);
  agree.parent(form);
  agree.changed(() => {
    if (agree.checked()) setTimeout(() => agree.checked(false), 1000);
  });

  // §4 Reason for visit
  createP('Reason for visit.').parent(form);
  let reason = createSelect();
  reason.option('To submit Form 27-A');
  reason.option('To appeal Form 27-A');
  reason.option('To ask why there is a Form 27-A');
  reason.parent(form);

  // Messages from the institution appear here
  let message = createP('').parent(form);

  let submit = createButton(labels[0]);
  submit.parent(form);
  submit.mousePressed(() => {
    clicks++;
    if (clicks === 1) {
      message.html('Your name is not on file. Please use a name that is on file.');
    }
    if (clicks < labels.length) {
      submit.html(labels[clicks]);
    } else {
      window.location.href = 'meat-processing.html';
    }
  });

//link toform B 
  createP('').parent(form).child(
    createA('form-b.html', 'This form requires an approved Form 27-B.')
  );
}
