

let escapes = 0;

function setup() {
  noCanvas();
  let form = select('#form');

  createElement('h2', 'Form 27-B').parent(form);

  // §1 Applicant number, in teeth boxes
  createP('Applicant no. (as issued on Form 27-A).').parent(form);
  let applicant = createInput('');
  applicant.class('teeth');
  applicant.addClass('short');
  applicant.attribute('maxlength', 7); // one fewer than the 8 boxes
  applicant.parent(form);

  // §2 Full name, teeth style
  createP('Full name, exactly as it does not appear on Form 27-A.').parent(form);
  let name = createInput('');
  name.class('teeth');
  name.attribute('maxlength', 19);
  name.parent(form);

  // §3 A question about the form itself
  createP('How did you hear about this form?').parent(form);
  let heard = createRadio();
  heard.option('From Form 27-A');
  heard.option('I did not hear about it');
  heard.option('I am hearing about it now');
  heard.parent(form);

  // §4 A checkbox nobody can honestly tick
  createP('Declaration.').parent(form);
  let read = createCheckbox('I have not read this declaration', false);
  read.parent(form);

  // Messages from the institution appear here
  let message = createP('').parent(form);

  // The Submit button that runs away three times, then gives in
  let submit = createButton('Submit');
  submit.parent(form);
  submit.mouseOver(() => {
    if (escapes < 3) {
      // Stay inside the form's box so the button never leaves the page
      let w = max(0, form.elt.clientWidth - 160);
      let h = max(0, form.elt.clientHeight - 60);
      submit.position(random(w), random(h));
      escapes++;
    }
  });
  submit.mousePressed(() => {
    message.html('Thank you. Your submission has been forwarded for processing.');
    setTimeout(() => { window.location.href = 'meat-processing.html'; }, 1500);
  });

  // The link back to the other form (the other half of the A ⇄ B loop)
  createP('').parent(form).child(
    createA('form-a.html', 'Only available to holders of an approved Form 27-A.')
  );
}
