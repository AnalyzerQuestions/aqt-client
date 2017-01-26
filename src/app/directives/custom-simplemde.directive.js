angular.module("components").directive('simpleMde', function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        template: `<textarea></textarea>`,
        link: function(scope, element, attrs, ngModelCtrl) {
            var editor = new SimpleMDE({
                element: element[0].querySelector('textarea'),
                spellChecker: true,
                styleSelectedText: true,
                showIcons: ["code"],
                forceSync: true,
                indentWithTabs: false,
                lineWrapping: false,
                hideIcons: ["heading", "fullscreen", "side-by-side"],
                previewRender: function(plainText, preview) {
                    setTimeout(function() {
                        preview.innerHTML = this.parent.markdown(plainText);
                        Prism.highlightAll();
                    }.bind(this), 1)
                    return "Loading..."
                },
                tabSize: 1,
                status: false,
                lineWrapping: true,
            });
            editor.codemirror.on('change', function() {
                ngModelCtrl && ngModelCtrl.$setViewValue(editor.markdown(editor.codemirror.getValue()));
            });
        }
    }
})
