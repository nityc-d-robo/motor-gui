import * as Blockly from 'blockly/core';

class CustomCategory extends Blockly.ToolboxCategory {
  /**
     * Constructor for a custom category.
     * @override
     */
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }

  /** @override  */
  createRowContainer_() {
    const rowContainerDom = document.createElement('div');
    return rowContainerDom;
  }

  /** @override  */
  createIconDom_() {
    const iconDom = document.createElement('div');
    return iconDom;
  }

  /** @override  */
  createLabelDom_(name) {
    const labelDom = document.createElement('button');
    labelDom.classList.add('blocklyTreeLabel');
    labelDom.textContent = name;
    return labelDom;
  }

  /** @override */
  setSelected(isSelected) {
    // JSでのcss書き換えは全て削除
    // This is used for accessibility purposes.
    Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
      Blockly.utils.aria.State.SELECTED, isSelected);
  }
}
Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  CustomCategory,
  true,
);
