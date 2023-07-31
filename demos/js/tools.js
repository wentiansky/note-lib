// 选择文本框中的文本（兼容IE）
function selectText(textbox, startIndex, stopIndex) {
  if (textbox.setSelectionRange) {
    textbox.setSelectionRange(startIndex, stopIndex);
  } else if (textbox.createTextRange) {
    var range = textbox.createTextRange();
    range.collapse(true);
    range.moveStart("character", startIndex);
    range.moveEnd("character", stopIndex - startIndex);
    range.select();
  }
  textbox.focus();
}

// 过滤掉非数字字符，且不过滤功能键
function filterCharacter() {
  EventUtil.addHandler(textbox, "keypress", function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);

    if (
      !/\d/.test(String.fromCharCode(charCode)) &&
      charCode > 9 &&
      !event.ctrlKey
    ) {
      EventUtil.preventDefault(event);
    }
  });
}
