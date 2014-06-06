/**
 * Created by iiwaasnet on 01.06.2014.
 */
angular.module('xpa').directive('xpaImageCrop', ['$document', function ($document) {
    return{
        restrict: 'E',
        templateUrl: 'views/partial/directives/xpaImageCrop.html',
        scope: {
            image: '@',
            imagePosition: '='
        },
        link: function (scope, element) {
            scope.dragging = false;

            var location = {
                    startX: 0,
                    startY: 0,
                    x: 0,
                    y: 0},
                minDelta = 3,
                cropArea = {
                    overlayWidth: 40,
                    width: 520,
                    height: 420
                };

            setupStyles(element);
            var image = getImage();

            function mouseDown(event) {
                event.preventDefault();
                scope.dragging = true;
                scope.$apply();
                element.on('mousemove', drag);
                element.on('mouseup mouseleave', stopDrag);

                location.startX = event.pageX - location.x;
                location.startY = event.pageY - location.y;
            }

            var drag = function (event) {
                location.y = Math.max(cropArea.height - cropArea.overlayWidth - imgHeight(),
                    Math.min(cropArea.overlayWidth, event.pageY - location.startY));
                location.x = Math.max(cropArea.width - cropArea.overlayWidth - imgWidth(),
                    Math.min(cropArea.overlayWidth, event.pageX - location.startX));

                if (Math.abs(location.y) >= minDelta || Math.abs(location.x) >= minDelta) {
                    scope.imagePosition.x = location.x;
                    scope.imagePosition.y = location.y;
                    scope.imageStyle = {
                        top: location.y + 'px',
                        left: location.x + 'px'
                    };
                    scope.$apply();
                }
            };

            function setupStyles(element) {
                scope.imageStyle = {
                    top: '0px',
                    left: '0px'
                };
                scope.containerStyle = {
                    width: cropArea.width + 'px',
                    height: cropArea.height + 'px'
                };

                var overlay = angular.element(element.children(0).children(0).children(0).children(0)[1]);
                overlay.css('-webkit-box-shadow', 'inset 0 0 0 ' + cropArea.overlayWidth + 'px white');
                overlay.css('box-shadow', 'inset 0 0 0 ' + cropArea.overlayWidth + 'px white');
            }

            function getImage() {
                return angular.element(element.children(0).children(0).children(0).children(0)[0])[0];
            }

            var imgHeight = function () {
                return (image)
                    ? image.clientHeight
                    : 0;
            };

            var imgWidth = function () {
                return (image)
                    ? image.clientWidth
                    : 0;
            };

            var stopDrag = function (event) {
                scope.dragging = false;
                scope.$apply();
                element.off('mousemove', drag);
                element.off('mouseup mouseleave', stopDrag);
            };

            function cropImage() {
                scope.editable = false;
                element.off('mousedown', mouseDown);
            }

            function editImage() {
                if (!scope.editable) {
                    scope.editable = true;
                    element.on('mousedown', mouseDown);
                }
            }

            editImage();
            scope.$on('crop-image', cropImage);
            scope.$on('edit-image', editImage);
        }
    };
}]);
