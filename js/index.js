$(function(){

  // jQueryオブジェクトを変数に代入
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');

  // 問題用の変数の初期化
  let char_index = 1;

  // TODO 最初の問題
  let max_length = 3;
  let question_number = 1;

  // 問題
  const MONDAI_LIST = [
    { yomi: 'ごはん', text: 'gohan' },
    { tomi: 'おすし', text: 'osushi' },
    { yomi: 'サイフ', text: 'saifu' },
    { yomi: 'バナナ', text: 'banana' },
    { yomi: 'くつした', text: 'kutsushita' },
  ];

  $(document).on('keypress', function(e){
    // alert('key:'+e.key);
    const $target = $('#char-' + char_index);
    const char = $target.text();


    // 入力文字と現在の位置の文字が一緒だったら
    if (e.key === char) {
      // alert('正解');
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
    }

    if (max_length < char_index) {
      changeQuestionWord();
      char_index = 1;
      // 次の問題を用意
      question_number++;
    }
  });

  // 次の問題の実装
  function changeQuestionWord() {
    const word = MONDAI_LIST[question_number]['text'];
    max_length = word.length;
    let newHtml = '';
    for (var i = 0; i < max_length; i++){
      newHtml += '<p id = "char-' + (i + 1) + '" class="text default">' + word[i] + '</p>';
    }
    // console.log('newHtml: ' + newHtml);
    $mondai.html(newHtml);
    $yomi.text(MONDAI_LIST[question_number]['yomi']);
  }
});