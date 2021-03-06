angular.module('xpa').directive('xpaImageCrop', [function () {
    return{
        restrict: 'E',
        templateUrl: 'app/imagecrop/xpaImageCrop.html',
        scope: {
            image: '='
        },
        link: function (scope, element) {
            scope.dragging = false;
            var location = {
                    startX: 0,
                    startY: 0,
                    x: 0,
                    y: 0},
                cropArea = getCropConfig();

            setupTemplate(element);
            var image = getImage();

            function mouseDown(event) {
                event.preventDefault();
                scope.dragging = true;
                scope.$digest();
                element.on('mousemove', drag);
                element.on('mouseup mouseleave', stopDrag);

                location.startX = event.pageX - location.x;
                location.startY = event.pageY - location.y;
            }

            var drag = function (event) {
                var imageSize = imgSize();
                location.y = Math.max(cropArea.height - cropArea.overlayWidth - imageSize.height,
                    Math.min(cropArea.overlayWidth, event.pageY - location.startY));
                location.x = Math.max(cropArea.width - cropArea.overlayWidth - imageSize.width,
                    Math.min(cropArea.overlayWidth, event.pageX - location.startX));

                scope.image.cropArea.x = location.x;
                scope.image.cropArea.y = location.y;
                setImageLocation(location.x, location.y);
                scope.$digest();
            };

            function setImageLocation(x, y) {
                scope.imageStyle = {
                    top: y + 'px',
                    left: x + 'px'
                };
            }

            function setupTemplate(element) {
                setImageLocation(0, 0);
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

            var imgSize = function () {
                return (image)
                    ? {
                    width: image.clientWidth,
                    height: image.clientHeight
                }
                    : {
                    width: 0,
                    height: 0
                };
            };

            var stopDrag = function (event) {
                scope.dragging = false;
                scope.$digest();
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

            function getCropConfig() {
                return {
                    overlayWidth: 40,
                    width: 520,
                    height: 420
                }
            }

            editImage();

            scope.$on('crop-image', cropImage);
            scope.$on('edit-image', editImage);
        }
    };
}]);
