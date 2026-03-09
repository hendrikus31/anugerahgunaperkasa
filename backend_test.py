#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class DetergentCompanyAPITester:
    def __init__(self, base_url="https://cleaning-brands.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status=200, data=None, validate_response=None):
        """Run a single API test"""
        url = f"{self.base_url}/api{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            
            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json() if response.text else {}
                    
                    # Run custom validation if provided
                    if validate_response:
                        validation_result = validate_response(response_data)
                        if not validation_result:
                            success = False
                            print(f"❌ Failed - Response validation failed")
                            self.failed_tests.append(f"{name}: Response validation failed")
                        
                    if success:
                        self.tests_passed += 1
                        print(f"✅ Passed - Status: {response.status_code}")
                        return True, response_data
                        
                except json.JSONDecodeError as e:
                    success = False
                    print(f"❌ Failed - Invalid JSON response: {str(e)}")
                    self.failed_tests.append(f"{name}: Invalid JSON response")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append(f"{name}: Status {response.status_code} instead of {expected_status}")

            return success, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            self.failed_tests.append(f"{name}: Network error - {str(e)}")
            return False, {}

    def validate_company_response(self, data):
        """Validate company API response structure and content"""
        required_fields = ['id', 'name', 'tagline', 'description', 'founded_year', 'address', 'whatsapp', 'logo_url']
        
        for field in required_fields:
            if field not in data:
                print(f"   Missing required field: {field}")
                return False
                
        # Validate specific content
        if data.get('name') != "PT. Anugerah Guna Perkasa":
            print(f"   Invalid company name: {data.get('name')}")
            return False
            
        if data.get('founded_year') != 2016:
            print(f"   Invalid founded year: {data.get('founded_year')}")
            return False
            
        if 'Kutawaringin Industrial Park' not in data.get('address', ''):
            print(f"   Invalid or missing address information")
            return False
            
        print(f"   ✓ Company data validated successfully")
        return True

    def validate_products_response(self, data):
        """Validate products API response structure and content"""
        if not isinstance(data, list):
            print(f"   Products response should be a list, got {type(data)}")
            return False
            
        if len(data) != 7:
            print(f"   Expected 7 products, got {len(data)}")
            return False
            
        required_fields = ['id', 'name', 'description', 'category', 'image_url', 'sizes']
        categories = set()
        
        for product in data:
            for field in required_fields:
                if field not in product:
                    print(f"   Missing required field '{field}' in product {product.get('id')}")
                    return False
            categories.add(product['category'])
        
        # Check if we have the expected categories
        expected_categories = {'Personal Care', 'Household', 'Laundry'}
        if not expected_categories.issubset(categories):
            print(f"   Missing expected categories. Found: {categories}")
            return False
            
        print(f"   ✓ {len(data)} products validated successfully with categories: {categories}")
        return True

    def validate_advantages_response(self, data):
        """Validate advantages API response structure and content"""
        if not isinstance(data, list):
            print(f"   Advantages response should be a list, got {type(data)}")
            return False
            
        if len(data) != 6:
            print(f"   Expected 6 advantages, got {len(data)}")
            return False
            
        required_fields = ['id', 'title', 'description', 'icon']
        
        for advantage in data:
            for field in required_fields:
                if field not in advantage:
                    print(f"   Missing required field '{field}' in advantage {advantage.get('id')}")
                    return False
        
        print(f"   ✓ {len(data)} advantages validated successfully")
        return True

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "/",
            200,
            validate_response=lambda data: 'message' in data and 'status' in data
        )

    def test_company_endpoint(self):
        """Test company information endpoint"""
        return self.run_test(
            "Company Information",
            "GET",
            "/company",
            200,
            validate_response=self.validate_company_response
        )

    def test_products_endpoint(self):
        """Test products list endpoint"""
        return self.run_test(
            "Products List",
            "GET",
            "/products",
            200,
            validate_response=self.validate_products_response
        )

    def test_individual_product(self, product_id=1):
        """Test individual product endpoint"""
        return self.run_test(
            f"Individual Product (ID: {product_id})",
            "GET",
            f"/products/{product_id}",
            200,
            validate_response=lambda data: 'id' in data and data['id'] == product_id
        )

    def test_advantages_endpoint(self):
        """Test advantages endpoint"""
        return self.run_test(
            "Company Advantages",
            "GET",
            "/advantages",
            200,
            validate_response=self.validate_advantages_response
        )

    def test_nonexistent_product(self):
        """Test handling of non-existent product"""
        success, data = self.run_test(
            "Non-existent Product",
            "GET",
            "/products/999",
            200  # API returns 200 with error message instead of 404
        )
        
        if success and 'error' in data:
            print(f"   ✓ Properly handles non-existent product with error message")
            return True
        else:
            print(f"   ❌ Should return error message for non-existent product")
            self.failed_tests.append("Non-existent Product: Should return error message")
            return False

def main():
    print("🏭 Testing PT. Anugerah Guna Perkasa API")
    print("=" * 60)
    
    tester = DetergentCompanyAPITester()
    
    # Run all tests
    print("\n📊 Running Backend API Tests...")
    
    # Test basic connectivity
    tester.test_api_root()
    
    # Test main endpoints
    tester.test_company_endpoint()
    tester.test_products_endpoint()
    tester.test_advantages_endpoint()
    
    # Test individual product endpoints
    for product_id in [1, 3, 7]:  # Test a few products
        tester.test_individual_product(product_id)
    
    # Test error handling
    tester.test_nonexistent_product()
    
    # Print summary
    print(f"\n" + "=" * 60)
    print(f"📈 Test Results Summary")
    print(f"=" * 60)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests:")
        for i, failed_test in enumerate(tester.failed_tests, 1):
            print(f"   {i}. {failed_test}")
    else:
        print(f"\n✅ All tests passed successfully!")
    
    # Return exit code based on results
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())