!function(){var e=function(e,t,i,a){var r=this;this.rowIndex=e,this.container=t,this.label=i,this.header=this.container.find(".repeater-row-header"),this.header.on("click",(function(){r.toggleMinimize()})),this.container.on("click",".repeater-row-remove",(function(){r.remove()})),this.header.on("mousedown",(function(){r.container.trigger("row:start-dragging")})),this.container.on("keyup change","input, select, textarea",(function(e){r.container.trigger("row:update",[r.rowIndex,jQuery(e.target).data("field"),e.target])})),this.setRowIndex=function(e){this.rowIndex=e,this.container.attr("data-row",e),this.container.data("row",e),this.updateLabel()},this.toggleMinimize=function(){this.container.toggleClass("minimized"),this.header.find(".dashicons").toggleClass("dashicons-arrow-up").toggleClass("dashicons-arrow-down")},this.remove=function(){this.container.slideUp(300,(function(){jQuery(this).detach()})),this.container.trigger("row:remove",[this.rowIndex])},this.updateLabel=function(){var e,t,i;if("field"===this.label.type&&(e=this.container.find('.repeater-field [data-field="'+this.label.field+'"]'),_.isFunction(e.val)&&""!==(t=e.val())))return _.isUndefined(a.params.fields[this.label.field])||_.isUndefined(a.params.fields[this.label.field].type)||("select"===a.params.fields[this.label.field].type?_.isUndefined(a.params.fields[this.label.field].choices)||_.isUndefined(a.params.fields[this.label.field].choices[e.val()])||(t=a.params.fields[this.label.field].choices[e.val()]):"radio"!==a.params.fields[this.label.field].type&&"radio-image"!==a.params.fields[this.label.field].type||(i=a.selector+' [data-row="'+this.rowIndex+'"] .repeater-field [data-field="'+this.label.field+'"]:checked',t=jQuery(i).val())),void this.header.find(".repeater-row-label").text(t);this.header.find(".repeater-row-label").text(this.label.value+" "+(this.rowIndex+1))},this.updateLabel()};wp.customize.controlConstructor.repeater=wp.customize.Control.extend({ready:function(){!_.isUndefined(window.kirkiControlLoader)&&_.isFunction(kirkiControlLoader)?kirkiControlLoader(this):this.initKirkiControl()},initKirkiControl:function(e){var t,i,a;a=(e=e||this).params.value,e.settingField=e.container.find("[data-customize-setting-link]").first(),e.setValue([],!1),e.repeaterFieldsContainer=e.container.find(".repeater-fields").first(),e.currentIndex=0,e.rows=[],t=!1,_.isUndefined(e.params.choices.limit)||(t=!(0>=e.params.choices.limit)&&parseInt(e.params.choices.limit,10)),e.container.on("click","button.repeater-add",(function(a){a.preventDefault(),!t||e.currentIndex<t?((i=e.addRow()).toggleMinimize(),e.initColorPicker(),e.initSelect(i)):jQuery(e.selector+" .limit").addClass("highlight")})),e.container.on("click",".repeater-row-remove",(function(){e.currentIndex--,(!t||e.currentIndex<t)&&jQuery(e.selector+" .limit").removeClass("highlight")})),e.container.on("click keypress",".repeater-field-image .upload-button,.repeater-field-cropped_image .upload-button,.repeater-field-upload .upload-button",(function(t){t.preventDefault(),e.$thisButton=jQuery(this),e.openFrame(t)})),e.container.on("click keypress",".repeater-field-image .remove-button,.repeater-field-cropped_image .remove-button",(function(t){t.preventDefault(),e.$thisButton=jQuery(this),e.removeImage(t)})),e.container.on("click keypress",".repeater-field-upload .remove-button",(function(t){t.preventDefault(),e.$thisButton=jQuery(this),e.removeFile(t)})),e.repeaterTemplate=_.memoize((function(){var t={evaluate:/<#([\s\S]+?)#>/g,interpolate:/\{\{\{([\s\S]+?)\}\}\}/g,escape:/\{\{([^\}]+?)\}\}(?!\})/g,variable:"data"};return function(i){return _.template(e.container.find(".customize-control-repeater-content").first().html(),null,t)(i)}})),a.length&&_.each(a,(function(t){i=e.addRow(t),e.initColorPicker(),e.initSelect(i,t)})),e.repeaterFieldsContainer.sortable({handle:".repeater-row-header",update:function(){e.sort()}})},openFrame:function(e){wp.customize.utils.isKeydownButNotEnterEvent(e)||(this.$thisButton.closest(".repeater-field").hasClass("repeater-field-cropped_image")?this.initCropperFrame():this.initFrame(),this.frame.open())},initFrame:function(){var e=this.getMimeType();this.frame=wp.media({states:[new wp.media.controller.Library({library:wp.media.query({type:e}),multiple:!1,date:!1})]}),this.frame.on("select",this.onSelect,this)},initCropperFrame:function(){var e=this.$thisButton.siblings("input.hidden-field").attr("data-field"),t=this.getMimeType();_.isString(e)&&""!==e&&_.isObject(this.params.fields[e])&&"cropped_image"===this.params.fields[e].type&&["width","height","flex_width","flex_height"].forEach(function(t){_.isUndefined(this.params.fields[e][t])||(this.params[t]=this.params.fields[e][t])}.bind(this)),this.frame=wp.media({button:{text:"Select and Crop",close:!1},states:[new wp.media.controller.Library({library:wp.media.query({type:t}),multiple:!1,date:!1,suggestedWidth:this.params.width,suggestedHeight:this.params.height}),new wp.media.controller.CustomizeImageCropper({imgSelectOptions:this.calculateImageSelectOptions,control:this})]}),this.frame.on("select",this.onSelectForCrop,this),this.frame.on("cropped",this.onCropped,this),this.frame.on("skippedcrop",this.onSkippedCrop,this)},onSelect:function(){var e=this.frame.state().get("selection").first().toJSON();this.$thisButton.closest(".repeater-field").hasClass("repeater-field-upload")?this.setFileInRepeaterField(e):this.setImageInRepeaterField(e)},onSelectForCrop:function(){var e=this.frame.state().get("selection").first().toJSON();this.params.width!==e.width||this.params.height!==e.height||this.params.flex_width||this.params.flex_height?this.frame.setState("cropper"):this.setImageInRepeaterField(e)},onCropped:function(e){this.setImageInRepeaterField(e)},calculateImageSelectOptions:function(e,t){var i,a,r,n=t.get("control"),s=!!parseInt(n.params.flex_width,10),o=!!parseInt(n.params.flex_height,10),l=e.get("width"),d=e.get("height"),h=parseInt(n.params.width,10),p=parseInt(n.params.height,10),c=h/p,u=l,f=d;return t.set("canSkipCrop",!n.mustBeCropped(s,o,h,p,l,d)),u/f>c?h=(p=f)*c:p=(h=u)/c,r={handles:!0,keys:!0,instance:!0,persistent:!0,imageWidth:l,imageHeight:d,x1:i=(u-h)/2,y1:a=(f-p)/2,x2:h+i,y2:p+a},!1===o&&!1===s&&(r.aspectRatio=h+":"+p),!1===o&&(r.maxHeight=p),!1===s&&(r.maxWidth=h),r},mustBeCropped:function(e,t,i,a,r,n){return!(!0===e&&!0===t||!0===e&&a===n||!0===t&&i===r||i===r&&a===n||r<=i)},onSkippedCrop:function(){var e=this.frame.state().get("selection").first().toJSON();this.setImageInRepeaterField(e)},setImageInRepeaterField:function(e){var t=this.$thisButton.closest(".repeater-field-image,.repeater-field-cropped_image");t.find(".kirki-image-attachment").html('<img src="'+e.url+'">').hide().slideDown("slow"),t.find(".hidden-field").val(e.id),this.$thisButton.text(this.$thisButton.data("alt-label")),t.find(".remove-button").show(),t.find("input, textarea, select").trigger("change"),this.frame.close()},setFileInRepeaterField:function(e){var t=this.$thisButton.closest(".repeater-field-upload");t.find(".kirki-file-attachment").html('<span class="file"><span class="dashicons dashicons-media-default"></span> '+e.filename+"</span>").hide().slideDown("slow"),t.find(".hidden-field").val(e.id),this.$thisButton.text(this.$thisButton.data("alt-label")),t.find(".upload-button").show(),t.find(".remove-button").show(),t.find("input, textarea, select").trigger("change"),this.frame.close()},getMimeType:function(){var e=this.$thisButton.siblings("input.hidden-field").attr("data-field");return _.isString(e)&&""!==e&&_.isObject(this.params.fields[e])&&"upload"===this.params.fields[e].type&&!_.isUndefined(this.params.fields[e].mime_type)?this.params.fields[e].mime_type:"image"},removeImage:function(e){var t,i;wp.customize.utils.isKeydownButNotEnterEvent(e)||(i=(t=this.$thisButton.closest(".repeater-field-image,.repeater-field-cropped_image,.repeater-field-upload")).find(".upload-button"),t.find(".kirki-image-attachment").slideUp("fast",(function(){jQuery(this).show().html(jQuery(this).data("placeholder"))})),t.find(".hidden-field").val(""),i.text(i.data("label")),this.$thisButton.hide(),t.find("input, textarea, select").trigger("change"))},removeFile:function(e){var t,i;wp.customize.utils.isKeydownButNotEnterEvent(e)||(i=(t=this.$thisButton.closest(".repeater-field-upload")).find(".upload-button"),t.find(".kirki-file-attachment").slideUp("fast",(function(){jQuery(this).show().html(jQuery(this).data("placeholder"))})),t.find(".hidden-field").val(""),i.text(i.data("label")),this.$thisButton.hide(),t.find("input, textarea, select").trigger("change"))},getValue:function(){return JSON.parse(decodeURI(this.setting.get()))},setValue:function(e,t,i){var a=e,r=[];i&&(jQuery.each(this.params.fields,(function(e,t){"image"!==t.type&&"cropped_image"!==t.type&&"upload"!==t.type||r.push(e)})),jQuery.each(e,(function(e,t){jQuery.each(r,(function(i,r){_.isUndefined(t[r])||_.isUndefined(t[r].id)||(a[e][r]=t[r].id)}))}))),this.setting.set(encodeURI(JSON.stringify(a))),t&&this.settingField.trigger("change")},addRow:function(t){var i,a,r,n=this,s=n.repeaterTemplate(),o=this.getValue(),l={};if(s){if(i=jQuery.extend(!0,{},n.params.fields),t)for(r in t)t.hasOwnProperty(r)&&i.hasOwnProperty(r)&&(i[r].default=t[r]);for(r in i.index=this.currentIndex,s=s(i),(a=new e(n.currentIndex,jQuery(s).appendTo(n.repeaterFieldsContainer),n.params.row_label,n)).container.on("row:remove",(function(e,t){n.deleteRow(t)})),a.container.on("row:update",(function(e,t,i,r){n.updateField.call(n,e,t,i,r),a.updateLabel()})),this.rows[this.currentIndex]=a,i)i.hasOwnProperty(r)&&(l[r]=i[r].default);return o[this.currentIndex]=l,this.setValue(o,!0),this.currentIndex++,a}},sort:function(){var e=this,t=this.repeaterFieldsContainer.find(".repeater-row"),i=[],a=e.getValue(),r=[],n=[];t.each((function(e,t){i.push(jQuery(t).data("row"))})),jQuery.each(i,(function(t,i){r[t]=e.rows[i],r[t].setRowIndex(t),n[t]=a[i]})),e.rows=r,e.setValue(n)},deleteRow:function(e){var t,i=this.getValue();for(t in i[e]&&this.rows[e]&&(delete i[e],delete this.rows[e],this.setValue(i,!0)),this.rows)this.rows.hasOwnProperty(t)&&this.rows[t]&&this.rows[t].updateLabel()},updateField:function(e,t,i,a){var r,n,s;this.rows[t]&&this.params.fields[i]&&(r=this.params.fields[i].type,n=this.rows[t],s=this.getValue(),a=jQuery(a),_.isUndefined(s[n.rowIndex][i])||(s[n.rowIndex][i]="checkbox"===r?a.is(":checked"):a.val(),this.setValue(s,!0)))},initColorPicker:function(){var e=this,t=e.container.find(".color-picker-hex"),i={},a=t.data("field");_.isUndefined(a)||_.isUndefined(e.params.fields[a])||_.isUndefined(e.params.fields[a].palettes)||!_.isObject(e.params.fields[a].palettes)||(i.palettes=e.params.fields[a].palettes),i.change=function(t,i){var a=jQuery(t.target),r=a.closest(".repeater-row").data("row"),n=e.getValue();n[r][a.data("field")]=i.color.toString(),e.setValue(n,!0)},t.length&&0!==t.length&&t.wpColorPicker(i)},initSelect:function(e,t){var i,a=this,r=e.container.find(".repeater-field select");0!==r.length&&(i=r.data("field"),multiple=jQuery(r).data("multiple"),(t=t||{})[i]=t[i]||"",jQuery(r).val(t[i]||jQuery(r).val()),this.container.on("change",".repeater-field select",(function(e){var t=jQuery(e.target),i=t.closest(".repeater-row").data("row"),r=a.getValue();r[i][t.data("field")]=jQuery(this).val(),a.setValue(r)})))}})}();
//# sourceMappingURL=control.js.map
