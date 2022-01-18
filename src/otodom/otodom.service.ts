import { from, Observable, toArray } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { POLYGONS } from './polygons';
import { ApartmentResponseDTO, ConcreteApartmentDTO } from './Apartment';

@Injectable()
export class OtodomService {
  readonly #httpService: HttpService;
  readonly #configService: ConfigService;

  constructor(httpService: HttpService, configService: ConfigService) {
    this.#httpService = httpService;
    this.#configService = configService;
  }

  getFlats(): Observable<string[]> {
    return this.#httpService
      .post<ApartmentResponseDTO>(
        this.#composeUrl().toString(),
        POLYGONS.join('&'),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(
        map((axiosResponse) => axiosResponse.data),
        mergeMap((response) => {
          return from(response.ads).pipe(
            map((apartmentDTO) => {
              const url = new URL('/i2/oferta/', 'https://www.otodom.pl');

              const searchParams = new URLSearchParams({
                json: '1',
                token: this.#configService.get<string>('OTODOM_API_TOKEN'),
                id: apartmentDTO.id,
              });

              url.search = searchParams.toString();

              return url.toString();
            }),
            concatMap((apartmentUrl) =>
              this.#httpService.get<ConcreteApartmentDTO>(apartmentUrl),
            ),
            map((axiosResponse) => axiosResponse.data),
            map((concreteApartment) => concreteApartment.url),
            toArray(),
          );
        }),
      );
  }

  #composeUrl(): URL {
    const url = new URL('/i2/ads/drawsearch/', 'https://www.otodom.pl');

    url.search = this.#composeSearchParams().toString();

    return url;
  }

  #composeSearchParams(): URLSearchParams {
    const searchParams = new URLSearchParams();

    searchParams.append('limit', '10'); // 500 default
    searchParams.append('json', '1');
    searchParams.append(
      'token',
      this.#configService.get<string>('OTODOM_API_TOKEN'),
    );
    searchParams.append('search[order]', 'created_at:desc');
    searchParams.append('search[filter_float_price:to]', '3500');
    searchParams.append('search[filter_enum_rooms_num][]', '2');
    searchParams.append('search[filter_enum_rooms_num][]', '3');
    searchParams.append('search[filter_float_m:from]', '40');
    searchParams.append('search[category_id]', '102');
    searchParams.append('compact', '1');
    searchParams.append('view', 'list');

    return searchParams;
  }
}
