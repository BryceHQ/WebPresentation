import React from 'react';

import IconBold from 'material-ui/lib/svg-icons/editor/format-bold';
import IconItalic from 'material-ui/lib/svg-icons/editor/format-italic';
import IconListBulleted from 'material-ui/lib/svg-icons/editor/format-list-bulleted';
import IconListNumbered from 'material-ui/lib/svg-icons/editor/format-list-numbered';
import IconQuote from 'material-ui/lib/svg-icons/editor/format-quote';
import IconStrikeThrough from 'material-ui/lib/svg-icons/editor/format-strikethrough';
import IconCode from 'material-ui/lib/svg-icons/action/code';
import IconPhoto from 'material-ui/lib/svg-icons/editor/insert-photo';
import IconIndentIncrease from 'material-ui/lib/svg-icons/editor/format-indent-increase';
// format-indent-decrease


const icons = {
	bold: <IconBold/>,
  italic: <IconItalic/>,
  listNumbered: <IconListNumbered/>,
  listBulleted: <IconListBulleted/>,
  quote: <IconQuote/>,
  strikeThrough: <IconStrikeThrough/>,
  code: <IconCode/>,
	photo: <IconPhoto/>,
	indent: <IconIndentIncrease/>,
};

export default icons;
