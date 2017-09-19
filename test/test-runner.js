QUnit.test('Viewport', function(assert) {
  assert.ok(window.innerWidth === 1366, 'Window is 1366px wide');
});

QUnit.test('When width is what we want', function(assert) {
  assert.ok($('#qunit-fixture').text() === '', 'Vazia');

  $('#qunit-fixture').applyOnScreen(function() {
    $('#qunit-fixture').html('<div class="test">test</div>');
  }).range(1300, 1400);

  assert.ok($('.test').text() === 'test', 'Correu a função');
});

QUnit.test('When width is not what we want', function(assert) {
  $('#qunit-fixture').applyOnScreen(function() {
    $('#qunit-fixture').html('<div class="test">something</div>');
  }).range(0, 767);

  assert.ok($('.test').text() === '', 'Não correu a função, como era suposto');
});
