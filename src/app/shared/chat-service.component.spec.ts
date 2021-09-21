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
            expect(item).toBeDefined;
            done();
        });
        const testRequest = httpMock.expectOne("http://localhost:3000/graphql");
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
    })
});