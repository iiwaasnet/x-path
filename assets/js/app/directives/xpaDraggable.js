angular.module('xpa').directive('xpaDraggable', ['$document', function ($document) {
    return {
        restrict: 'A',
        scope: {
            drag: '='
        },
        link: function (scope, element, attrs) {
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0,
                minDelta = 3;

            var image = angular.element($document[0].querySelector(".crop-img"));

            element.css({
                position: 'relative'
            });

            element
                .on('mousedown', (function (event) {
                    if(scope.drag) {
                        event.preventDefault();
                        this.classList.add('dragging');
                        element.on('mousemove', drag);
                        element.on('mouseup mouseleave', stopDrag);

                        startX = event.pageX - x;
                        startY = event.pageY - y;
                    }
                }));

            var drag = function(event){
                if(scope.drag) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    if (Math.abs(y) >= minDelta || Math.abs(x) >= minDelta) {
                        image.css({
                            top: y + 'px',
                            left: x + 'px'
                        });
                    }
                }
            };

            var stopDrag = function(event){
                this.classList.remove('dragging');
                element.off('mousemove', drag);
                element.off('mouseup mouseleave', stopDrag);
            };
        }
    };
}]);

