describe('appication', function () {
    describe('ContentController test', function () {
        var controller, scope, systemService, CustomerApi, DictionaryApi, $httpBackend;
        beforeEach(function () {
            module('ngCookies', 'main', 'resource');
            inject(function ($injector) {
                systemService = $injector.get('SystemService');
                CustomerApi = $injector.get('CustomerApi');
                DictionaryApi = $injector.get('DictionaryApi');
            });
            inject(function ($controller, $rootScope, _$httpBackend_) {
                scope = $rootScope.$new();
                controller = $controller('ContentController', {
                    $scope: scope,
                    SystemService: systemService,
                    CustomerApi: CustomerApi,
                    DictionaryApi: DictionaryApi
                });
                $httpBackend = _$httpBackend_;
                var mockCustomer =
                {
                    customer: {
                        juralTypeId: 1,
                        birthDate: "12.12.2004"
                    }
                };

                var mockTypes = ["types1", "types2"];
                var mockClasses = ["classes1", "classes2"];
                $httpBackend.whenGET('http://localhost/api/customers/98').respond(200, mockCustomer);
                $httpBackend.whenGET('locales/ru_RU.json').respond(200);
                $httpBackend.whenGET('http://localhost/api/dictionaries/types').respond(200, mockTypes);
                $httpBackend.whenGET('http://localhost/api/dictionaries/classes').respond(200, mockClasses);
            });

        });
        it('check scope.model', function () {
            expect(scope.model.data.customerId).toBe(98);
            expect(scope.model.customer).toBe(null);
            expect(scope.model.data.privilege.length).toBe(5);
        });
        it('check scope.onSubmit', function () {
            spyOn(scope, 'onSubmit');
            scope.onSubmit();
            expect(scope.onSubmit).toHaveBeenCalledWith();

        });
        it('check $watch', function () {
            systemService.data.customerId = 97;
            scope.$digest();
            expect(systemService.data.customerId).toEqual(97);
        })
        it('check DictionaryApi.get', function () {
            DictionaryApi.get({dictionaryName: 'classes'});
            DictionaryApi.get({dictionaryName: 'types'});
            $httpBackend.flush();
            expect(scope.model.data.dictionaries.classes.length).toBe(2);
            expect(scope.model.data.dictionaries.types.length).toBe(2);
        });

    });
    describe('HeaderController test', function () {
        var controller, scope, systemService;
        beforeEach(function () {
            module('ngCookies', 'main');
            inject(function ($injector) {
                systemService = $injector.get('SystemService');
            });
            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                controller = $controller('HeaderController', {
                    $scope: scope,
                    SystemService: systemService
                });
            });
        });
        it('check scope.changeCustomer', function () {
            scope.changeCustomer(98);
            expect(systemService.data.customerId).toBe(98);
        });
    });
    describe('JuralTypeFilter filter', function () {
        beforeEach(module('ngCookies', 'main'));
        it('filtered', inject(function ($filter) {
            var result = $filter('byJuralType')([
                {isOnlyForJural: false}, {isOnlyForJural: true}, {isOnlyForJural: false}, {isOnlyForJural: true}
            ], 1);
            expect(result.length).toBe(2);
        }));
        it('not filtered', inject(function ($filter) {
            var result = $filter('byJuralType')([
                {isOnlyForJural: false}, {isOnlyForJural: true}, {isOnlyForJural: false}, {isOnlyForJural: true}
            ], undefined);
            expect(result.length).toBe(4);
        }));
    });
    describe('SystemService', function () {
        beforeEach(module('ngCookies', 'main'));
        it('check SystemService.data.customerId', inject(function (SystemService) {
            expect(SystemService.data.customerId).toBe(null);
        }));
    });
    describe('resource test', function () {
        var $httpBackend;
        var mockCustomer;
        beforeEach(module('resource'));
        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            mockCustomer =
            {
                customer: {
                    juralTypeId: 1,
                    birthDate: "12.12.2004"
                }
            };
            var mockTypes = ["types1", "types2"];
            $httpBackend.whenGET('http://localhost/api/customers/1').respond(200, mockCustomer);
            $httpBackend.whenGET('http://localhost/api/dictionaries/types').respond(200, mockTypes);
        }));
        it('check CustomerApi get method', inject(function (CustomerApi) {
            var responseBirthDate;
            CustomerApi.get({customerId: 1}, function (data) {
                responseBirthDate = data.customer.birthDate;
            });
            $httpBackend.flush();
            expect(responseBirthDate).toBe("12.12.2004");
        }));
        it('check DictionaryApi get method', inject(function (DictionaryApi) {
            var responseType;
            DictionaryApi.get({dictionaryName: 'types'}, function (data) {
                responseType = data[1];
            });
            $httpBackend.flush();
            expect(responseType).toBe("types2");
        }));
    });
});