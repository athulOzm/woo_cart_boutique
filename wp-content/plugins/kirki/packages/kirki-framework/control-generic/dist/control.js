wp.customize.controlConstructor["kirki-generic"]=wp.customize.kirkiDynamicControl.extend({initKirkiControl:function(i){var c=(i=i||this).params;i.container.find("input, textarea").on("change input",(function(){var e=jQuery(this).val();"kirki-generic"===c.type&&c.choices&&"number"===c.choices.type&&(c.choices.min=parseFloat(c.choices.min),c.choices.max=parseFloat(c.choices.max),e<c.choices.min?e=c.choices.min:e>c.choices.max&&(e=c.choices.max)),i.setting.set(e)}))}});
//# sourceMappingURL=control.js.map
