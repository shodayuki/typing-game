$(function(){

  // jQueryオブジェクトを変数に代入
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');
  const $finishPanel = $('#finish-panel');
  const $countSelect = $('#count-select');
  const $correctMessage = $('#correct-message');
  const $mistakeMessage = $('#mistake-message');

  // 問題用の変数の初期化
  let char_index = 1;

  // TODO 最初の問題
  let max_length = 3;
  let question_number = 1;
  let question_limit = 3;
  let done_questions = {};
  let typing_cnt = 0;
  let correct_cnt = 0;
  let mistake_cnt = 0;

  // 問題
  const MONDAI_LIST = [
    { yomi: 'ごはん', text: 'gohan' },
    { tomi: 'おすし', text: 'osushi' },
    { yomi: 'サイフ', text: 'saifu' },
    { yomi: 'バナナ', text: 'banana' },
    { yomi: 'くつした', text: 'kutsushita' },
    {yomi:'なべ', text:'nabe'},
    {yomi:'あし', text:'ashi'},
    {yomi:'パソコン', text:'pasokon'},
    {yomi:'けいたい', text:'keitai'},
    {yomi:'ふとん', text:'futon'},
  ];

  // 最初の問題の設定
  changeQuestionWord(getQuestionNumber());

  $countSelect.on('change', function(e){
    question_limit = Number($countSelect.val());
    done_questions = {};
    changeQuestionWord(getQuestionNumber());
  })

  $(document).on('keypress', function (e) {
    typing_cnt++;
    // alert('key:'+e.key);
    const $target = $('#char-' + char_index);
    const char = $target.text();

    // 入力文字と現在の位置の文字が一緒だったら
    if (e.key === char) {
      // alert('正解');
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
      correct_cnt++;
    } else {
      mistake_cnt++;
    }

    if (max_length < char_index) {
      question_number++;
      if (question_limit < question_number) {
        finish();
        return;
      }
      changeQuestionWord(getQuestionNumber());
      char_index = 1; // 初期化
    }
  });

  function getQuestionNumber() {
    let random_number = Math.floor(Math.random() * 10);
    while (done_questions[random_number] !== undefined) {
      random_number = Math.floor(Math.random() * 10);
    }
    done_questions[random_number] = random_number;
    return random_number;
  }

  function finish() {
    $finishPanel.removeClass('hidden');
    $yomi.hide();
    $mondai.hide();
    $correctMessage.text('正解数：'+correct_cnt+'/'+typing_cnt+'  ('+ Math.floor(correct_cnt/typing_cnt * 100)+'%)');
    $mistakeMessage.text('間違い数：'+mistake_cnt+'/'+typing_cnt+'  ('+ Math.floor(mistake_cnt/typing_cnt * 100)+'%)');
  }

  // 次の問題の実装
  function changeQuestionWord(index) {
    const word = MONDAI_LIST[index]['text'];
    max_length = word.length;
    let newHtml = '';
    for (var i = 0; i < max_length; i++){
      newHtml += '<p id = "char-' + (i + 1) + '" class="text default">' + word[i] + '</p>';
    }
    // console.log('newHtml: ' + newHtml);
    $mondai.html(newHtml);
    $yomi.text(MONDAI_LIST[index]['yomi']);
  }
});