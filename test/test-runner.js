if (typeof QUnit != 'undefined') {
  QUnit.test('Viewport', function(assert) {
    assert.equal(window.innerWidth, 1366, 'Window is 1366px wide');
  });

  QUnit.test('When width is what we want', function(assert) {
    assert.equal($('#qunit-fixture').text(), '', 'Check if content of #qunit-fiuxture div is empty so we can test if something is written in the next step');

    $('#qunit-fixture').applyOnScreen(function() {
      $('#qunit-fixture').html('<div class="test">test</div>');
    }).range(1365, 1367);

    assert.equal($('.test').text(), 'test', 'Function was executed because 1366 is between 1300 and 1400');
  });

  QUnit.test('When width is not what we want', function(assert) {
    $('#qunit-fixture').applyOnScreen(function() {
      $('#qunit-fixture').html('<div class="test">something</div>');
    }).range(0, 767);

    assert.equal($('.test').text(), '', "Function was not executed because 1366 isn't between 0 and 767");
  });
}

