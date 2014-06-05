/**
 * Created by iiwaasnet on 01.06.2014.
 */
angular.module('xpa').directive('xpaImageCrop', ['$document', function ($document) {
    return{
        restrict: 'A',
        templateUrl: 'views/partial/directives/xpaImageCrop.html',
        scope: {
            src: '@',
            imagePosition: '='
        },
        transclude: true,
        link: function (scope, element, attrs, ctrl, transclude) {
            transcludeImage(element, transclude);

            var startX = 0,
                startY = 0,
                x = 0,
                y = 0,
                minDelta = 3,
                crop = {
                    overlayWidth: 40,
                    width: 520,
                    height: 420,
                    opacity: 0.75
                };

            var dom = setupStyles(element);
            var image = dom.image;

            element.on('mousedown', mouseDown);

            scope.$on('crop-image', function(){
                cropImage();
            });

            function mouseDown(event) {
                event.preventDefault();
                element.addClass('dragging');
                element.on('mousemove', drag);
                element.on('mouseup mouseleave', stopDrag);

                startX = event.pageX - x;
                startY = event.pageY - y;
            }

            var cropImage = function(){
                stopDrag();
                element.off('mousedown', mouseDown);
                dom.overlay.css({opacity: 1});
            };

            var drag = function (event) {
                y = Math.max(crop.height - crop.overlayWidth - imgHeight(), Math.min(crop.overlayWidth, event.pageY - startY));
                x = Math.max(crop.width - crop.overlayWidth - imgWidth(), Math.min(crop.overlayWidth, event.pageX - startX));

                if (Math.abs(y) >= minDelta || Math.abs(x) >= minDelta) {
                    image.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                    scope.imagePosition.x = x;
                    scope.imagePosition.y = y;
//                    scope.$apply();
                }
            };

            function setupStyles(element) {
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
                    position: 'relative',
                    width: crop.width + 'px',
                    height: crop.height + 'px'
                });

                return {
                    image: image,
                    overlay: overlay
                };
            }

            function transcludeImage(element, transclude) {
                var placeholder = element.find('span');
                var cssClass = placeholder.attr('class');
                var template = angular.element(transclude()[1]);
                template.attr('class', cssClass);
                placeholder.replaceWith(template);
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
                element.removeClass('dragging');
                element.off('mousemove', drag);
                element.off('mouseup mouseleave', stopDrag);
            };
        }
    };
}]);
