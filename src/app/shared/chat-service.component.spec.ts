import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChatServiceService } from './chat-service.service';

fdescribe('ChatServiceService', () => {
    let service: ChatServiceService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(ChatServiceService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    fdescribe('postBody', () => {
        it('postBody should send a POST reqeust and return the posted item', (done) => {
            service.postBody({
                channelId: '1',
                text: 'mock unit test http request from angular app',
                user: {
                    _id: "Russell",
                    userName: "Russell",
                    avatar: "Russell.png"
                }
            }).subscribe((item) => {
                expect(item).toBeDefined();
                done();
            }, (error) => {
                fail("The request was supposed to return an empty array");
                done();
            });
            const testRequest = httpMock.expectOne({ url: "http://localhost:3000/graphql", method: "POST" });
            expect(testRequest.request.method).toBe("POST");
            expect(testRequest.request.body).toEqual({
                channelId: '1',
                text: 'mock unit test http request from angular app',
                user: {
                    _id: "Russell",
                    userName: "Russell",
                    avatar: "Russell.png"
                }
            });
            testRequest.flush({
                channelId: '1',
                text: 'mock unit test http request from angular app',
                user: {
                    _id: "Russell",
                    userName: "Russell",
                    avatar: "Russell.png"
                }
            })
        });
        it("should return an empty array if an Internal Server Error occurs", (done) => {
            service.postBody({
                channelId: '1',
                text: 'mock unit test http request from angular app',
                user: {
                    _id: "Russell",
                    userName: "Russell",
                    avatar: "Russell.png"
                }
            }).subscribe((item) => {
                expect(item).toBeDefined();
                expect(Array.isArray(item)).toBe(true);
                expect(item.length).toBe(0);
                done();
            }, (error) => {
                fail("The request was supposed to return an empty array");
                done();
            });
            const testRequest = httpMock.expectOne({ url: "http://localhost:3000/graphql", method: "POST" });
            expect(testRequest.request.method).toBe("POST");
            testRequest.flush({}, { status: 500, statusText: "Internal Server Error" })
        })
    })


});