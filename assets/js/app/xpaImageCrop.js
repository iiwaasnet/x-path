/**
 * Created by iiwaasnet on 01.06.2014.
 */
angular.module('xpa').directive('xpaImageCrop', ['$document', function ($document) {
    return{
        restrict: 'E',
        templateUrl: 'views/partial/directives/xpaImageCrop.html',
        scope: {
            src: '@'
        },
        link: function (scope, element, attrs) {
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0,
                minDelta = 3,
                overlayWidth = 60;

            var image = angular.element(element.children(0).children(0).children(0)[0]);
            var overlay = angular.element(element.children(0).children(0).children(0)[1]);
            overlay.css('-webkit-box-shadow', 'inset 0 0 0 ' + overlayWidth + 'px white');
            overlay.css('box-shadow', 'inset 0 0 0 ' + overlayWidth + 'px white');

            element.css({
                position: 'relative'
            });

            element
                .on('mousedown', (function (event) {
                    event.preventDefault();
                    this.classList.add('dragging');
                    element.on('mousemove', drag);
                    element.on('mouseup mouseleave', stopDrag);

                    startX = event.pageX - x;
                    startY = event.pageY - y;
                }));

            var drag = function (event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                if (Math.abs(y) >= minDelta || Math.abs(x) >= minDelta) {
                    image.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }
            };

            var stopDrag = function (event) {
                this.classList.remove('dragging');
                element.off('mousemove', drag);
                element.off('mouseup mouseleave', stopDrag);
            };
        }
    };
}]);
