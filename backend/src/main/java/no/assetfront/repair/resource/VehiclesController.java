package no.assetfront.repair.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200/")


public class VehiclesController {
    @Autowired
    private RestTemplate restTemplate;
    @GetMapping(value = "asset/lookup/{serialNumber}", headers = {"api_key=JFg26WuKBjgZ","accept=application/json"})

    public List<Object> getVehicleInfo(@PathVariable("serialNumber") String serialNumber) {
        String url = "https://test-assetlookup.dev.assetfront.com/asset/lookup/"+serialNumber;
        Object [] objects = restTemplate.getForObject(url,Object[].class);

        return Arrays.asList(objects);
    }
}

