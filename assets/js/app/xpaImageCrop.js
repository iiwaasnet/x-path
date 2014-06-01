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
                crop = {
                    overlayWidth: 40,
                    width: 520,
                    height: 420
                }

            var image = angular.element(element.children(0).children(0).children(0)[0]);
            var overlay = angular.element(element.children(0).children(0).children(0)[1]);
            var container = element.children(0);

            container.css({
                width: crop.width + 'px',
                height: crop.height + 'px'
            });
            overlay.css('-webkit-box-shadow', 'inset 0 0 0 ' + crop.overlayWidth + 'px white');
            overlay.css('box-shadow', 'inset 0 0 0 ' + crop.overlayWidth + 'px white');

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
                y = Math.max(crop.height - crop.overlayWidth - imgHeight(), Math.min(crop.overlayWidth, event.pageY - startY));
                x = Math.max(crop.width - crop.overlayWidth - imgWidth(), Math.min(crop.overlayWidth, event.pageX - startX));

                if (Math.abs(y) >= minDelta || Math.abs(x) >= minDelta) {
                    image.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }
            };

            var imgHeight = function () {
                return (image)
                    ? image[0].clientHeight
                    : 0;
            };

            var imgWidth = function () {
                return (image)
                    ? image[0].clientWidth
                    : 0;
            };

            var stopDrag = function (event) {
                this.classList.remove('dragging');
                element.off('mousemove', drag);
                element.off('mouseup mouseleave', stopDrag);
            };
        }
    };
}]);
